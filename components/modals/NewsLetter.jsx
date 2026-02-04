"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

export default function NewsLetter({ popUp }) {
    const modalElement = useRef(null);
    const [hasScrolled, setHasScrolled] = useState(false);
    const locale = useLocale();
    const t = useTranslations();
    
    // 1. Safe Data Access
    const data = Array.isArray(popUp) && popUp.length > 0 ? popUp[0] : null;

    // 2. Localization Helpers
    const isRtl = locale === 'ar';
    const title = data ? (isRtl ? data.name_ar : data.name) : '';
    const description = data ? (isRtl ? data.description_ar : data.description) : '';
    
    // Assumption: Images are stored in a relative assets directory. 
    // Adjust logic if full URLs are provided by backend.
    const imagePath = data ? `${process.env.NEXT_PUBLIC_API_URL}storage/${data.image}` : ''; 
    const mobileImagePath = data ? `${process.env.NEXT_PUBLIC_API_URL}storage/${data.mobile_image}` : '';
    const linkPath = data ? `/${locale}/${data.link}` : '#';

    let modalInstance = null;

    useEffect(() => {
        // Prevent execution if no data
        if (!data) return;

        const bootstrap = require("bootstrap");

        modalInstance = new bootstrap.Modal(modalElement.current, {
            keyboard: false,
        });

        const showModal = () => {
            if (!hasScrolled) {
                modalInstance.show();
                setHasScrolled(true);
            }
        };

        const handleScroll = () => {
            if (window.scrollY > 3500 && !hasScrolled) {
                showModal();
            }
        };

        const closeBtn = modalElement.current.querySelector(".btn-close");
        if(closeBtn) {
            closeBtn.addEventListener("click", () => {
                modalInstance.hide();
            });
        }

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (closeBtn) {
                closeBtn.removeEventListener("click", () => modalInstance?.hide());
            }
        };
    }, [hasScrolled, data]);

    // Return null if no data is provided to prevent rendering empty modal
    if (!data) return null;

    return (
        <div
            className="modal fade"
            id="newsletterPopup"
            ref={modalElement}
            tabIndex="-1"
            data-bs-backdrop="true"
            aria-hidden="true"
        >
            <div className="modal-dialog newsletter-popup modal-dialog-centered">
                <div className="modal-content">
                    <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                    ></button>
                    
                    <div className="row p-0 m-0">
                        {/* Image Section */}
                        <div className="col-md-8 p-0">
                            <div className="newsletter-popup__bg h-100 w-100">
                                <a href={linkPath}>
                                    {/* Desktop Image */}
                                    <div className="d-none d-lg-block h-100">
                                        <Image
                                            width={550}
                                            height={650}
                                            style={{ height: "fit-content" }}
                                            loading="lazy"
                                            src={imagePath} // Dynamic Source
                                            className="h-100 w-100 object-fit-cover d-block"
                                            alt={title}
                                        />
                                    </div>

                                    {/* Mobile Image (Replaces previous VideoPanel) */}
                                    <div className="d-sm-block d-md-none">
                                        <Image
                                            width={550}
                                            height={650}
                                            style={{ height: "fit-content" }}
                                            loading="lazy"
                                            src={mobileImagePath} // Dynamic Mobile Source
                                            className="h-100 w-100 object-fit-cover d-block hover-effect"
                                            alt={title}
                                        />
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="col-md-4 p-0 d-flex align-items-center text-center">
                            <div className="block-newsletter w-100 px-3 py-4">
                                <h3
                                    className="section-title fw-normal mb-3"
                                    style={{ color: "#5c6137" }}
                                >
                                    {title}
                                </h3>
                                <p className="mb-3" style={{ fontSize: "1rem", color: "#333" }}>
                                    {description}
                                </p>
                                <div className="mb-4" style={{ fontSize: "0.95rem", color: "#555" }} dangerouslySetInnerHTML={{ __html: isRtl ? data.content_ar : data.content }} />
                                <div className="d-flex justify-content-center">
                                    <a className="btn-rounded btn-link_lg text-uppercase fw-medium hover-effect" href={linkPath} >
                                        {t("Shop Now")}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}