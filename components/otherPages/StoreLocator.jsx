"use client";
import React, { useState } from "react";
// import StoreMap from "./StoreMap";
// import { storesLocations } from "@/data/storeLocations";
import Script from "next/script";

export default function StoreLocator() {
  return (
    <>
      <Script
        src="https://cdnsl.brandwizard.io/dist/widget.min.js"
        strategy="afterInteractive"
      />
      <div data-rd-locator="131b58e1-6241-42c7-ba4c-4f92883e4b65"></div>
    </>
  );
}
