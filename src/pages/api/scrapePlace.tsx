// src/pages/api/scrapeData.ts

import type { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";
import {
  setupBrowser,
  getTextContent,
  getAttribute,
  getAllTextContent,
  getMenuItems,
} from "../../util/puppeteerUtils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const url = "http://place.map.kakao.com/20747449"; // 스크래핑할 웹 페이지 URL
  const { url } = req.query;
  try {
    const browser = await puppeteer.launch(); // Puppeteer 브라우저 실행
    const page = await browser.newPage(); // 새 페이지 생성

    // 페이지 이동 및 완전한 로드까지 대기
    await page.goto(url, { waitUntil: "networkidle0" }); // 네트워크 활동이 완전히 멈출 때까지 대기

    // 페이지의 동적 콘텐츠를 렌더링하기 위해 JavaScript를 실행합니다.
    // 예를 들어, 페이지의 특정 요소를 클릭하여 동적 콘텐츠를 로드합니다.
    // // 이 부분은 실제로 필요한 동작에 따라 수정해야 합니다.
    // await page.evaluate(() => {
    //   // 예시: 페이지의 특정 요소를 클릭하여 동적 콘텐츠를 로드합니다.
    //   document.querySelector("#someDynamicContentButton")?.click();
    // });

    // 전체 HTML을 가져오기
    // const htmlContent = await page.evaluate(
    //   () => document.documentElement.outerHTML
    // );
    const title = await getTextContent(page, "title");

    // Open Graph 메타데이터 가져오기
    const ogTitle = await getAttribute(
      page,
      'meta[property="og:title"]',
      "content"
    );
    const ogSiteName = await getAttribute(
      page,
      'meta[property="og:site_name"]',
      "content"
    );
    const ogDescription = await getAttribute(
      page,
      'meta[property="og:description"]',
      "content"
    );
    // const ogType = await getAttribute(
    //   page,
    //   'meta[property="og:type"]',
    //   "content"
    // );
    const ogImage = await getAttribute(
      page,
      'meta[property="og:image"]',
      "content"
    );
    const ogUrl = await getAttribute(
      page,
      'meta[property="og:url"]',
      "content"
    );

    // await browser.close(); // 브라우저 닫기
    const operatingHours = await getTextContent(
      page,
      ".tit_operation.fst + .list_operation li"
    );
    const holidayOperatingHours = await getTextContent(
      page,
      ".tit_operation + .list_operation li"
    );
    const caution = await getTextContent(
      page,
      ".operation_caution .list_caution li"
    );
    const contact = await getTextContent(
      page,
      ".placeinfo_contact .location_present .num_contact .txt_contact"
    );

    // 태그 가져오기
    const tags = await getAllTextContent(
      page,
      ".placeinfo_default .location_detail .txt_tag .tag_g a"
    );
    const menuItems = await getMenuItems(
      page,
      ".info_menu .loss_word",
      ".info_menu .price_menu"
    );

    // const name = await getTextContent(page, '.operation_caution .list_caution li');
    // const caution = await getTextContent(page, '.operation_caution .list_caution li');

    await browser.close(); // 브라우저 닫기

    res.status(200).json({
      title: title || "정보 없음",
      ogTitle: ogTitle || "정보 없음",
      ogSiteName: ogSiteName || "정보 없음",
      ogDescription: ogDescription || "정보 없음",
      // ogType: ogType || "정보 없음",
      ogImage: ogImage || "정보 없음",
      ogUrl: ogUrl || "정보 없음",
      operatingHours: operatingHours || "정보 없음",
      holidayOperatingHours: holidayOperatingHours || "정보 없음",
      caution: caution || "정보 없음",
      // homepage: homepage || "정보 없음",
      contact: contact || "연락처 정보는 제공되지 않습니다.",
      tag: tags || "연락처 정보는 제공되지 않습니다.",
      menuItems:
        menuItems.length > 0 ? menuItems : ["메뉴 정보를 가져올 수 없습니다."],
    });
    // res.status(200).json({ html: htmlContent });
  } catch (error) {
    console.error("Error scraping data:", error);
    res.status(500).json({ error: "Failed to scrape data" });
  }
}
