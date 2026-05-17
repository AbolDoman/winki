interface BlueTextProps {
  children: React.ReactNode;
}

const BlueText = ({ children }: BlueTextProps) => {
  return (
    <p className="text-[16px] desktop:text-2xl text-[#0091C2] font-medium text-center leading-[180%]">
      {children}
    </p>
  );
};

export default BlueText;
