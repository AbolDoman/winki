import Script from 'next/script';

interface SchemaScriptProps {
  schema: object | object[];
}

/**
 * Component to inject JSON-LD schema into page head
 * Supports single schema or array of schemas
 */
export default function SchemaScript({ schema }: SchemaScriptProps) {
  const schemaArray = Array.isArray(schema) ? schema : [schema];

  return (
    <>
      {schemaArray.map((schemaItem, index) => (
        <Script
          key={index}
          id={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaItem),
          }}
          strategy="beforeInteractive"
        />
      ))}
    </>
  );
}
