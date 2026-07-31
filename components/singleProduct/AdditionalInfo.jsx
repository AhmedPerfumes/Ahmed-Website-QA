import React from "react";
import { useTranslations, useLocale } from "next-intl";

export default function AdditionalInfo({ product_name, video, title, product }) {
  const t = useTranslations();
  const locale = useLocale();

  function cleanProductName(productName) {
    const dynamicKey = productName.replace(/[^a-zA-Z0-9\s]/g, '') + ' Notes';
    const wordsToRemove = ['&', ' &', '& ', ' & ', 'amp', ' amp', 'amp ', ' amp ', ';', ' ;', '; ', ' ; '];
    let cleanString = dynamicKey;
    wordsToRemove.forEach(word => {
      const regex = new RegExp(word, 'gi');
      cleanString = cleanString.replace(regex, '');
    });
    return cleanString.replace(/\s+/g, ' ').trim();
  }

  const getNoteText = (enField, arField) => {
    if (locale === 'ar') {
      if (product?.[arField]) return product[arField];
      if (product?.[enField]) return product[enField];
      return null;
    } else {
      if (product?.[enField]) return product[enField];
      return null;
    }
  };

  const topDesc = getNoteText('top_note_description', 'top_note_description_ar');
  const heartDesc = getNoteText('heart_note_description', 'heart_note_description_ar');
  const baseDesc = getNoteText('base_note_description', 'base_note_description_ar');

  const topImg = product?.top_note_image;
  const heartImg = product?.heart_note_image;
  const baseImg = product?.base_note_image;

  const hasApiNotes = topDesc || heartDesc || baseDesc || topImg || heartImg || baseImg;

  const renderTranslationFallback = () => {
    const key = cleanProductName(product_name || "");
    let trans = null;
    try { trans = t.raw(key); } catch(e) {}
    if (typeof t.has === 'function' && t.has(key)) return t.raw(key);
    if (typeof t.has !== 'function' && trans && trans !== key) return trans;
    return trans || key;
  };

  return (
    <>
      {!hasApiNotes ? (
        <div dangerouslySetInnerHTML={{ __html: renderTranslationFallback() }}></div>
      ) : (
        <div className="fragrance-notes row mt-5 justify-content-center gx-4">
          {(topDesc || topImg) && (
            <div className="col-md-4 text-center mb-4 d-flex">
              <div className="note-card p-4 h-100 w-100" style={{ 
                background: 'linear-gradient(180deg, rgba(35,35,35,0.5) 0%, rgba(15,15,15,0.9) 100%)', 
                border: '1px solid rgba(212, 175, 55, 0.2)',
                borderRadius: '8px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                transition: 'transform 0.3s ease'
              }}>
                {topImg && (
                  <div className="img-wrapper mb-4" style={{ height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={`${process.env.NEXT_PUBLIC_API_URL}storage/${topImg}`} alt="Top Note" className="img-fluid" style={{ maxHeight: '100%', objectFit: 'contain', filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.5))' }} />
                  </div>
                )}
                <h4 className="mb-3 text-uppercase" style={{ color: '#D4AF37', letterSpacing: '2px', fontSize: '1rem', fontWeight: '500' }}>
                  {t("Top Notes") || "Top Notes"}
                </h4>
                <p style={{ color: '#e0e0e0', lineHeight: '1.7', fontSize: '0.95rem', fontWeight: '300' }}>{topDesc}</p>
              </div>
            </div>
          )}
          {(heartDesc || heartImg) && (
            <div className="col-md-4 text-center mb-4 d-flex">
              <div className="note-card p-4 h-100 w-100" style={{ 
                background: 'linear-gradient(180deg, rgba(35,35,35,0.5) 0%, rgba(15,15,15,0.9) 100%)', 
                border: '1px solid rgba(212, 175, 55, 0.2)',
                borderRadius: '8px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                transition: 'transform 0.3s ease'
              }}>
                {heartImg && (
                  <div className="img-wrapper mb-4" style={{ height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={`${process.env.NEXT_PUBLIC_API_URL}storage/${heartImg}`} alt="Heart Note" className="img-fluid" style={{ maxHeight: '100%', objectFit: 'contain', filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.5))' }} />
                  </div>
                )}
                <h4 className="mb-3 text-uppercase" style={{ color: '#D4AF37', letterSpacing: '2px', fontSize: '1rem', fontWeight: '500' }}>
                  {t("Heart Notes") || "Heart Notes"}
                </h4>
                <p style={{ color: '#e0e0e0', lineHeight: '1.7', fontSize: '0.95rem', fontWeight: '300' }}>{heartDesc}</p>
              </div>
            </div>
          )}
          {(baseDesc || baseImg) && (
            <div className="col-md-4 text-center mb-4 d-flex">
              <div className="note-card p-4 h-100 w-100" style={{ 
                background: 'linear-gradient(180deg, rgba(35,35,35,0.5) 0%, rgba(15,15,15,0.9) 100%)', 
                border: '1px solid rgba(212, 175, 55, 0.2)',
                borderRadius: '8px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                transition: 'transform 0.3s ease'
              }}>
                {baseImg && (
                  <div className="img-wrapper mb-4" style={{ height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={`${process.env.NEXT_PUBLIC_API_URL}storage/${baseImg}`} alt="Base Note" className="img-fluid" style={{ maxHeight: '100%', objectFit: 'contain', filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.5))' }} />
                  </div>
                )}
                <h4 className="mb-3 text-uppercase" style={{ color: '#D4AF37', letterSpacing: '2px', fontSize: '1rem', fontWeight: '500' }}>
                  {t("Base Notes") || "Base Notes"}
                </h4>
                <p style={{ color: '#e0e0e0', lineHeight: '1.7', fontSize: '0.95rem', fontWeight: '300' }}>{baseDesc}</p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="align-items-lg-center mb-5 mt-5">
        <div className="col-lg-12 d-flex align-items-center justify-content-center mb-5">
          <h2 className="mb-3 text-white">
            {title}
          </h2>
        </div>
        {video &&
          <div className="image-wrapper col-lg-12">
            <video
              className="h-auto w-100"
              autoPlay
              loop
              muted
              controls
              src={`${process.env.NEXT_PUBLIC_API_URL}storage/${video}`} type="video/mp4" width={200}
              alt=""
            />
          </div>
        }
      </div>
    </>
  );
}
