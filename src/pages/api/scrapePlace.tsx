// src/pages/api/scrapeData.ts

import type { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.query;
  if (typeof url !== "string") {
    return res.status(400).json({ error: "Invalid URL" });
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle0" });

    // 특정 요소의 텍스트 추출
    const data = await page.evaluate(() => {
      const ogTitle =
        document
          .querySelector('meta[property="og:title"]')
          ?.getAttribute("content") || "No og:title found";
      const description =
        document.querySelector(".description")?.textContent ||
        "No description found";
      const imageUrl = document.querySelector("img")?.src || "No image found";
      const operationTime =
        document.querySelector(".time_operation")?.textContent ||
        "No operation time found";
      const contactNumber =
        document.querySelector(".txt_contact")?.textContent ||
        "No contact number found";
      const holiday =
        document.querySelector(".holiday")?.textContent || "No holiday found";
      const closedDay =
        document.querySelector(".txt_operation")?.textContent ||
        "No closed day found";
      const tags = Array.from(document.querySelectorAll(".link_tag")).map(
        (tag) => tag.textContent || ""
      );
      const address =
        document.querySelector(".txt_address")?.textContent?.trim() ||
        "No address found";
      const addressDetail =
        document.querySelector(".txt_addrnum")?.textContent?.trim() ||
        "No address detail found";
      const reviewCount =
        document.querySelector(".link_evaluation")?.getAttribute("data-cnt") ||
        "No review count found";
      const reviewTarget =
        document
          .querySelector(".link_evaluation")
          ?.getAttribute("data-target") || "No review target found";
      const reviewScore =
        document
          .querySelector(".link_evaluation .color_b")
          ?.textContent?.trim() || "No review score found";
      // 배경 이미지 URL 추출
      // 링크 이미지 URL 추출
      // 배경 이미지 URL 추출
      const backgroundImageElement = document.querySelector(".bg_present");
      const backgroundImageStyle =
        backgroundImageElement?.getAttribute("style") || "";
      const backgroundImageUrlMatch = backgroundImageStyle.match(
        /url\(["']?(.*?)["']?\)/
      );
      let backgroundImageUrl = backgroundImageUrlMatch
        ? backgroundImageUrlMatch[1]
        : "No background image found";
      if (backgroundImageUrl.startsWith("//")) {
        backgroundImageUrl = "https:" + backgroundImageUrl;
      }

      // 메뉴 추출
      const menuElements = Array.from(
        document.querySelectorAll(".list_menu > li:not(.hide)")
      );
      const menus = menuElements.slice(0, 5).map((menuElement) => {
        const name =
          menuElement.querySelector(".loss_word")?.textContent ||
          "No menu name found";
        const price =
          menuElement
            ?.querySelector(".price_menu")
            ?.textContent?.replace(/[^0-9]/g, "") || "No menu price found";

        return {
          name,
          price,
        };
      });

      return {
        ogTitle,
        description,
        imageUrl,
        operationTime,
        contactNumber,
        holiday,
        closedDay,
        tags,
        address,
        backgroundImageUrl,
        addressDetail,
        reviewCount,
        reviewTarget,
        reviewScore,
        menus,
      };
    });

    await browser.close();

    res.status(200).json(data);
  } catch (error) {
    console.error("Error scraping data:", error);
    res.status(500).json({ error: "Failed to scrape data" });
  }
}
