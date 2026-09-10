const FloatingSocials = () => {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-[9999] flex flex-col items-center gap-5">

      {/* INSTAGRAM */}
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
      >
        <img 
          src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
          alt="Instagram"
          className="w-6 h-6 hover:scale-125 transition duration-300"
        />
      </a>

      {/* FACEBOOK */}
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
      >
        <img 
          src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
          alt="Facebook"
          className="w-6 h-6 hover:scale-125 transition duration-300"
        />
      </a>

      {/* X */}
      <a
        href="https://x.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X (Twitter)"
      >
        <div className="p-1 rounded-md bg-white/20 backdrop-blur-sm">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/5/57/X_logo_2023_%28white%29.png"
            alt="X"
            className="w-6 h-6 hover:scale-125 transition duration-300 drop-shadow-[0_0_4px_rgba(0,0,0,0.8)]"
          />
        </div>
      </a>

      {/* LINKEDIN */}
      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <img 
          src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png"
          alt="LinkedIn"
          className="w-6 h-6 hover:scale-125 transition duration-300"
        />
      </a>

      {/* WHATSAPP */}
      <a
        href="https://wa.me/919811263046?text=Hello%20AIxperts%20Labs%2C%20I%20would%20like%20to%20inquire%20about%20your%20services"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <img 
          src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
          alt="WhatsApp"
          className="w-6 h-6 hover:scale-125 transition duration-300"
        />
      </a>

    </div>
  );
};

export default FloatingSocials;