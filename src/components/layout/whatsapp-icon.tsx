import Link from "next/link";

const WhatsappIcon = () => {
  const phoneNumber = "94778673863";
  const message = "Hello! I'm interested in your co-working spaces.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-transform hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="h-8 w-8 fill-current"
      >
        <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.8.73 5.54 2.11 7.95L.5 31.5l7.74-2.09A15.44 15.44 0 0 0 16 31.5c8.56 0 15.5-6.94 15.5-15.5S24.56.5 16 .5zm0 28.12c-2.57 0-5.06-.68-7.25-1.97l-.52-.31-4.59 1.24 1.23-4.47-.34-.55A12.46 12.46 0 0 1 3.5 16c0-6.9 5.6-12.5 12.5-12.5S28.5 9.1 28.5 16s-5.6 12.62-12.5 12.62zm6.82-9.32c-.37-.19-2.22-1.1-2.57-1.22-.34-.13-.59-.19-.83.19-.25.37-.96 1.22-1.17 1.47-.22.25-.43.28-.8.09-.37-.19-1.56-.57-2.97-1.83-1.1-.98-1.83-2.19-2.05-2.56-.22-.37-.02-.57.16-.75.16-.16.37-.43.56-.65.19-.22.25-.37.37-.62.12-.25.06-.47-.03-.65-.1-.19-.83-2-1.14-2.73-.3-.72-.61-.62-.83-.63h-.71c-.25 0-.65.09-1 .47-.34.37-1.31 1.28-1.31 3.12 0 1.84 1.34 3.62 1.53 3.87.19.25 2.64 4.03 6.4 5.65.9.39 1.6.62 2.14.79.9.29 1.72.25 2.37.15.72-.11 2.22-.91 2.54-1.8.31-.87.31-1.61.22-1.8-.1-.18-.34-.28-.71-.47z" />
      </svg>
    </Link>
  );
};

export default WhatsappIcon;
