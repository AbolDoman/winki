'use client';

// main
import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect, useMemo } from 'react';

// api
import {
  getTicket,
  addTicketMessage,
  downloadTicketAttachment,
  getTicketAttachmentImage,
  closeTicket,
} from '@/services/tickets';
// types
import type {
  GetTicketResponse,
  TicketAttachment,
  TicketViewProps,
} from '@/types/chat/types/tickets';

// icons
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';
import IconProvider from '@/providers/Iconprovider';

type TicketAttachmentWithMeta = TicketAttachment & {
  download_url: string;
  original_name: string;
  file_type: string;
};

const TicketView = ({ params }: TicketViewProps) => {
  // اگر params شما Promise نیست، این درست است:
  const id = String(params?.id ?? '');
  const ticketId = Number.parseInt(id, 10);

  const [newMessage, setNewMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDrawerClosing, setIsDrawerClosing] = useState(false);

  const [ticketData, setTicketData] = useState<GetTicketResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isSending, setIsSending] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // cache ساده برای URL تصویر attachmentها
  const imageUrlCacheRef = useRef<Map<number, string>>(new Map());
  const imageLoadingSetRef = useRef<Set<number>>(new Set());

  const ticket = ticketData?.data || ticketData?.ticket;

  const messages = useMemo(() => {
    const list = [...(ticket?.messages || [])];
    return list.reverse();
  }, [ticket?.messages]);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    }, 50);
  };

  const fetchTicket = async () => {
    if (!Number.isFinite(ticketId)) return;
    try {
      setIsLoading(true);
      const res = await getTicket(ticketId);
      setTicketData(res);
    } catch (error) {
      console.error('[TicketView Fetch Error]', error);
      setTicketData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (!Number.isFinite(ticketId)) {
        setIsLoading(false);
        setTicketData(null);
        return;
      }

      try {
        setIsLoading(true);
        const res = await getTicket(ticketId);
        if (!cancelled) setTicketData(res);
      } catch (error) {
        if (!cancelled) {
          console.error('[TicketView Fetch Error]', error);
          setTicketData(null);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [ticketId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString('fa-IR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const closeDrawer = () => {
    setIsDrawerClosing(true);
    setTimeout(() => {
      setIsDetailsModalOpen(false);
      setIsDrawerClosing(false);
    }, 300);
  };

  const handleSendMessage = async () => {
    if (!Number.isFinite(ticketId)) return;
    if (!newMessage.trim() && !selectedFile) return;

    const data: { message: string; attachments?: File[] } = {
      message: newMessage || ' ',
    };
    if (selectedFile) data.attachments = [selectedFile];

    try {
      setIsSending(true);
      await addTicketMessage(ticketId, data);

      setNewMessage('');
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';

      // رفرش تیکت
      await fetchTicket();
    } catch (error) {
      console.error('[TicketView Send Error]', error);
      alert('خطا در ارسال پیام');
    } finally {
      setIsSending(false);
    }
  };

  const handleCloseTicket = async () => {
    if (!Number.isFinite(ticketId)) return;

    try {
      setIsClosing(true);
      await closeTicket(ticketId);
      await fetchTicket();
    } catch (error) {
      console.error('[TicketView Close Error]', error);
      alert('خطا در بستن تیکت');
    } finally {
      setIsClosing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleDownloadAttachment = async (
    attachment: TicketAttachment & {
      download_url: string;
      original_name: string;
    },
  ) => {
    try {
      const blob = await downloadTicketAttachment(ticketId, attachment.id);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = attachment.original_name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert('خطا در دانلود فایل');
    }
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return '/icons/file.svg';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'webp':
        return '/icons/gallery.svg';
      case 'doc':
      case 'docx':
        return '/icons/file.svg';
      case 'txt':
        return '/icons/file.svg';
      default:
        return '/icons/file.svg';
    }
  };

  // بدون React Query: کامپوننت نمایش تصویر با کش ساده
  const ImageDisplay = ({ attachment }: { attachment: TicketAttachmentWithMeta }) => {
    const [imageUrl, setImageUrl] = useState<string | null>(() => {
      return imageUrlCacheRef.current.get(attachment.id) ?? null;
    });
    const [loading, setLoading] = useState<boolean>(() => !imageUrl);

    useEffect(() => {
      let cancelled = false;

      const cached = imageUrlCacheRef.current.get(attachment.id);
      if (cached) {
        setImageUrl(cached);
        setLoading(false);
        return;
      }

      // جلوگیری از درخواست همزمان تکراری برای یک attachment
      if (imageLoadingSetRef.current.has(attachment.id)) {
        // یک polling سبک: وقتی کش پر شد state را آپدیت می‌کنیم
        const interval = setInterval(() => {
          const c = imageUrlCacheRef.current.get(attachment.id);
          if (c) {
            clearInterval(interval);
            if (!cancelled) {
              setImageUrl(c);
              setLoading(false);
            }
          }
        }, 150);

        return () => {
          cancelled = true;
          clearInterval(interval);
        };
      }

      imageLoadingSetRef.current.add(attachment.id);

      const run = async () => {
        try {
          setLoading(true);
          const url = await getTicketAttachmentImage(ticketId, attachment.id);
          if (cancelled) return;

          imageUrlCacheRef.current.set(attachment.id, url);
          setImageUrl(url);
        } catch (error) {
          if (!cancelled) {
            console.error('[TicketView Image Error]', error);
            setImageUrl(null);
          }
        } finally {
          imageLoadingSetRef.current.delete(attachment.id);
          if (!cancelled) setLoading(false);
        }
      };

      run();

      return () => {
        cancelled = true;
      };
    }, [attachment.id]);

    if (loading) {
      return (
        <div className="w-full max-h-[300px] flex justify-center items-center bg-gray-400 rounded-lg animate-pulse">
          <Image
            className="size-full object-cover mix-blend-multiply"
            src="/placeholder.png"
            alt="file"
            width={100}
            height={100}
          />
        </div>
      );
    }

    if (!imageUrl) {
      return (
        <div className="w-full max-h-[300px] bg-red-100 rounded-lg flex items-center justify-center">
          <div className="text-red-500 text-sm">خطا در لود تصویر</div>
        </div>
      );
    }

    return (
      <img
        src={imageUrl}
        alt={attachment.original_name || 'تصویر'}
        className="rounded-lg w-full max-h-[300px] object-contain"
      />
    );
  };

  if (isLoading) {
    return (
      <div className="animate-pulse flex flex-col gap-4 p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-neutral-100" />
          <div className="h-5 w-40 rounded bg-neutral-100" />
        </div>
        <div className="flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={`h-14 rounded-xl bg-neutral-100 ${i % 2 === 0 ? 'w-3/4 self-end' : 'w-2/3 self-start'}`} />
          ))}
        </div>
        <div className="h-12 rounded-xl bg-neutral-100 mt-auto" />
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
        <p className="text-red-600">تیکت یافت نشد</p>
      </div>
    );
  }

  return (
    <div className="desktop:mb-0 mb-8">
      <div className="pb-6">
        <Link href="/profile/support" className="flex items-center w-fit gap-2 desktop:hidden">
          <div className="size-[20px]">
            <IconProvider icon="ArrowLeft" size={20} color="#0A3C63" />
          </div>
          <p className="text-novinlife-900">پشتیبانی</p>
        </Link>
        <div className="w-full h-px bg-[#EDEDED] mt-6 desktop:hidden"></div>
      </div>

      <div className="bg-[#E9F3FB] p-2 md:p-6 rounded-2xl flex gap-6">
        {/* Desktop Details Section */}
        <div className="flex-col gap-3 w-[400px] lg:flex hidden shrink-0">
          <div className="bg-white rounded-2xl p-4 h-fit">
            <h3 className="text-lg font-semibold text-novinlife-900 mb-4">جزئیات درخواست</h3>

            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-3">
                <div className="text-sm text-gray-500 mb-1">عنوان درخواست</div>
                <div className="text-base text-gray-800">{ticket.subject}</div>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <div className="text-sm text-gray-500 mb-1">شناسه درخواست</div>
                <div className="text-base text-gray-800">#{ticket.id}</div>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <div className="text-sm text-gray-500 mb-1">وضعیت</div>
                <div
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    ticket.status === 'open'
                      ? 'bg-novinlife-50 text-novinlife-400'
                      : ticket.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {ticket.status === 'open'
                    ? 'باز'
                    : ticket.status === 'pending'
                      ? 'در انتظار'
                      : ticket.status === 'closed'
                        ? 'بسته شده'
                        : ticket.status}
                </div>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <div className="text-sm text-gray-500 mb-1">دسته‌بندی</div>
                <div className="text-base text-gray-800">
                  {ticket.department?.name || ticket.department_name || '-'}
                </div>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <div className="text-sm text-gray-500 mb-1">تاریخ ثبت</div>
                <div className="text-base text-gray-800">
                  {new Date(ticket.created_at).toLocaleDateString('fa-IR')}
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-500 mb-1">آخرین بروزرسانی</div>
                <div className="text-base text-gray-800">
                  {new Date(ticket.updated_at || ticket.created_at).toLocaleDateString('fa-IR')}
                </div>
              </div>
            </div>
          </div>

          {/* Feedback Section */}
          <div className="mt-4 flex flex-col bg-white p-4 rounded-2xl">
            {ticket.status === 'closed' ? (
              <div className="text-gray-600 text-center py-2">این تیکت بسته شده</div>
            ) : (
              <>
                <div className="text-gray-500 mb-3">در صورت دریافت پاسخ تیکت خود را ببندید</div>
                <div className="flex items-center justify-end">
                  <button
                    onClick={handleCloseTicket}
                    disabled={isClosing}
                    className="flex justify-end h-[40px] bg-novinlife-50 hover:bg-white text-novinlife-600 border-novinlife-600 border transition-all cursor-pointer p-2 rounded-lg gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>{isClosing ? 'در حال بستن...' : 'بستن تیکت'}</span>
                    <Image src="/icons/check.svg" alt="close" width={20} height={20} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl w-full">
          <div className="flex items-center justify-between px-5 py-4 rounded-t-2xl bg-novinlife-100 border border-[#2100C81A]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-novinlife-400 rounded-full flex items-center justify-center">
                <HiOutlineChatBubbleLeftRight className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-lg lg:text-xl font-semibold text-novinlife-900">
                  {ticket.subject}
                </h1>
                <p className="text-sm text-novinlife-600">شناسه #{id}</p>
              </div>
            </div>
            <Link href="/profile/support">
              <Image
                className="size-[28px] lg:size-[32px]"
                src="/icons/close-circle-01.svg"
                alt="close"
                width={32}
                height={32}
              />
            </Link>
          </div>

          <div className="bg-white h-[300px] md:h-[500px] flex flex-col">
            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto py-4 px-5 space-y-4 scrollbar-thin"
            >
              {messages.map((msg) => {
                const isUser = msg.sender_type === 'customer' || msg.sender_type === 'user';
                return (
                  <div key={msg.id} className={`flex ${isUser ? 'justify-start' : 'justify-end'}`}>
                    <div
                      className={`max-w-[70%] rounded-[5px] px-4 py-3 relative ${
                        isUser ? 'bg-novinlife-100 text-black' : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      {isUser ? (
                        <div className="inline-block absolute top-0 -right-2 w-0 h-0 border-solid border-t-[18px] border-r-[18px] border-l-0 border-b-0 border-l-transparent border-r-transparent border-t-[#ddf0ff] border-b-transparent" />
                      ) : (
                        <div className="inline-block absolute top-0 -left-2 w-0 h-0 border-solid border-t-[18px] border-l-[18px] border-r-0 border-b-0 border-l-transparent border-r-transparent border-t-gray-100 border-b-transparent" />
                      )}

                      {msg.attachments && msg.attachments.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          {(msg.attachments as TicketAttachmentWithMeta[]).map((attachment) =>
                            attachment.file_type?.startsWith('image/') ? (
                              <div
                                key={attachment.id}
                                className="relative cursor-pointer"
                                onClick={() => handleDownloadAttachment(attachment)}
                              >
                                <ImageDisplay attachment={attachment} />
                              </div>
                            ) : (
                              <button
                                key={attachment.id}
                                onClick={() => handleDownloadAttachment(attachment)}
                                className="flex items-center gap-2 bg-gray-100 cursor-pointer hover:bg-gray-200 rounded-lg p-2 transition-colors"
                              >
                                <Image
                                  src={getFileIcon(attachment.original_name)}
                                  alt="file"
                                  width={16}
                                  height={16}
                                />
                                <span className="text-sm text-gray-700 truncate max-w-[120px]">
                                  {attachment.original_name}
                                </span>
                              </button>
                            ),
                          )}
                        </div>
                      )}

                      <p className="text-sm desktop:text-base leading-relaxed">{msg.message}</p>
                      <p className="text-sm desktop:text-base leading-relaxed mt-1 text-gray-500">
                        {formatTime(msg.created_at)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {ticket.status !== 'closed' && (
            <div className="border-t border-gray-200 p-2 lg:p-4">
              {/* Mobile */}
              <div className="sm:hidden flex flex-col gap-3">
                <div className="flex flex-col gap-2 border border-gray-300 focus-within:border-novinlife-400 hover:border-novinlife-400 rounded-xl p-2">
                  {selectedFile && (
                    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-2">
                      <span className="text-sm text-gray-600 truncate max-w-[150px]">
                        {selectedFile.name}
                      </span>
                      <button
                        onClick={() => setSelectedFile(null)}
                        className="cursor-pointer text-[#2D2D2D] text-sm rounded-lg transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  )}

                  <textarea
                    ref={inputRef}
                    placeholder="پیام خود را بنویسید..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="w-full flex items-center justify-between bg-white border-0 rounded-[10px] px-[15px] py-[10px] text-right text-sm desktop:text-[16px] text-novinlife-900 focus:outline-none transition-colors placeholder:text-sm desktop:placeholder:text-[16px] placeholder:text-gray-400 focus:placeholder:text-novinlife-900 resize-none min-h-[44px] max-h-[120px]"
                    rows={1}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = 'auto';
                      target.style.height = Math.min(target.scrollHeight, 120) + 'px';
                    }}
                  />

                  <div className="flex items-center justify-end gap-3">
                    <Image
                      className="cursor-pointer size-5"
                      src="/icons/file.svg"
                      alt="file"
                      width={26}
                      height={26}
                      onClick={() => fileInputRef.current?.click()}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={(!newMessage.trim() && !selectedFile) || isSending}
                      className="w-[28px] h-[28px] bg-novinlife-400 text-white rounded flex items-center justify-center hover:bg-novinlife-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSending ? (
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white" />
                      ) : (
                        <Image
                          className="size-[15px]"
                          src="/icons/send.svg"
                          alt="send"
                          width={24}
                          height={24}
                        />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Desktop */}
              <div className="hidden sm:flex items-end gap-3 border border-gray-300 focus-within:border-novinlife-400 hover:border-novinlife-400 rounded-xl p-2">
                <div className="flex-1">
                  <textarea
                    ref={inputRef}
                    placeholder="پیام خود را بنویسید..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="w-full flex items-center justify-between bg-white border-0 rounded-[10px] px-[15px] py-[10px] text-right text-sm desktop:text-[16px] text-novinlife-900 focus:outline-none transition-colors placeholder:text-sm desktop:placeholder:text-[16px] placeholder:text-gray-400 focus:placeholder:text-novinlife-900 resize-none min-h-[44px] max-h-[120px]"
                    rows={1}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = 'auto';
                      target.style.height = Math.min(target.scrollHeight, 120) + 'px';
                    }}
                  />
                </div>

                <div className="flex gap-2 relative bottom-2 items-center">
                  <Image
                    className="cursor-pointer sm:size-[26px] size-5"
                    src="/icons/file.svg"
                    alt="file"
                    width={26}
                    height={26}
                    onClick={() => fileInputRef.current?.click()}
                  />
                </div>

                {selectedFile && (
                  <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-2">
                    <span className="text-sm text-gray-600 truncate max-w-[150px]">
                      {selectedFile.name}
                    </span>
                    <button
                      onClick={() => setSelectedFile(null)}
                      className="cursor-pointer text-[#2D2D2D] text-sm rounded-lg transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                )}

                <div className="flex items-center">
                  <button
                    onClick={handleSendMessage}
                    disabled={(!newMessage.trim() && !selectedFile) || isSending}
                    className="w-[28px] h-[28px] cursor-pointer sm:w-auto sm:px-[18px] sm:h-12 bg-novinlife-400 text-white rounded sm:rounded-lg flex gap-2 items-center justify-center hover:bg-novinlife-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSending ? (
                      <>
                        <span className="hidden sm:block text-lg">در حال ارسال...</span>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                      </>
                    ) : (
                      <>
                        <span className="hidden sm:block text-lg">ارسال</span>
                        <Image
                          className="size-[24px]"
                          src="/icons/send.svg"
                          alt="send"
                          width={24}
                          height={24}
                        />
                      </>
                    )}
                  </button>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="hidden"
                accept="image/*,application/pdf,.doc,.docx,.txt"
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Details Button */}
      <div className="lg:hidden mt-4">
        <button
          onClick={() => setIsDetailsModalOpen(true)}
          className="w-full text-novinlife-400 border border-novinlife-400 rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-novinlife-500 transition-colors"
        >
          <HiOutlineChatBubbleLeftRight className="text-white text-lg" />
          <span className="text-base font-medium">جزئیات درخواست</span>
        </button>

        <div className="mt-4 flex flex-col">
          {ticket.status === 'closed' ? (
            <div className="text-gray-600 text-center rounded-lg bg-gray-200 border border-gray-500 py-2">
              این تیکت بسته شده
            </div>
          ) : (
            <div className="border border-gray-200 p-2 rounded-lg">
              <div className="text-gray-500 mb-3">در صورت دریافت پاسخ تیکت خود را ببندید</div>
              <div className="flex items-center justify-end">
                <button
                  onClick={handleCloseTicket}
                  disabled={isClosing}
                  className="flex justify-end h-[40px] bg-novinlife-50 hover:bg-white text-novinlife-600 border-novinlife-600 border transition-all cursor-pointer p-2 rounded-lg gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{isClosing ? 'در حال بستن...' : 'بستن تیکت'}</span>
                  <Image src="/icons/check.svg" alt="close" width={20} height={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Drawer for Details */}
      {isDetailsModalOpen && (
        <div
          className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ${
            isDrawerClosing ? 'opacity-0' : 'opacity-100'
          }`}
          onClick={closeDrawer}
        >
          <div
            className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl h-[60vh] max-h-[90vh] overflow-y-auto transition-transform duration-300 ease-out ${
              isDrawerClosing ? 'translate-y-full' : 'translate-y-0'
            }`}
            style={{ animation: !isDrawerClosing ? 'slideUp 0.3s ease-out' : undefined }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">جزئیات درخواست</h3>
              <button
                onClick={closeDrawer}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div className="flex flex-col gap-2 pb-3 border-b border-gray-200">
                <span className="text-xs text-gray-500">عنوان درخواست</span>
                <span className="text-base text-gray-800">{ticket.subject}</span>
              </div>

              <div className="flex flex-col">
                <div className="flex justify-between border-b border-gray-200">
                  <div className="flex items-start gap-1 flex-col pb-3 border-gray-200">
                    <span className="text-xs text-gray-500">شناسه درخواست</span>
                    <span className="text-sm text-gray-800">#{ticket.id}</span>
                  </div>
                  <div className="flex items-start gap-1 flex-col border-gray-200">
                    <span className="text-xs text-gray-500">وضعیت</span>
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${
                        ticket.status === 'open'
                          ? 'bg-novinlife-50 text-novinlife-400'
                          : ticket.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : ticket.status === 'closed'
                              ? 'bg-gray-100 text-gray-700'
                              : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {ticket.status === 'open'
                        ? 'باز'
                        : ticket.status === 'pending'
                          ? 'در انتظار'
                          : ticket.status === 'closed'
                            ? 'بسته'
                            : ticket.status}
                    </span>
                  </div>
                </div>

                <div className="flex gap-4 justify-between pt-3">
                  <div className="flex items-start gap-1 flex-col">
                    <span className="text-xs text-gray-500">دسته‌بندی</span>
                    <span className="text-sm text-gray-800">
                      {ticket.department?.name || ticket.department_name || '-'}
                    </span>
                  </div>
                  <div className="flex items-start gap-1 flex-col">
                    <span className="text-xs text-gray-500">تاریخ ثبت</span>
                    <span className="text-sm text-gray-800">
                      {new Date(ticket.created_at).toLocaleDateString('fa-IR')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketView;
