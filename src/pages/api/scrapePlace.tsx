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
      const ogUrl =
        document
          .querySelector('meta[property="og:url"]')
          ?.getAttribute("content") || "No og:url found";

      const linkHomepage =
        document.querySelector(".location_present .link_homepage")?.href ||
        "No homepage link found";

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
      const filteredTags = tags
        .map((tag) => tag.trim()) // 각 요소의 앞뒤 공백을 제거
        .filter((tag) => tag.length > 0); // 길이가 0보다 큰 요소만 필터링

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
      // 지하철역 정보 추출
      const subwayStations = Array.from(
        document.querySelectorAll(".station_wayout .list_wayout li")
      ).map((station) => {
        const stationName =
          station.querySelector(".txt_station a")?.textContent?.trim() ||
          "No station name found";
        const lines = Array.from(station.querySelectorAll(".ico_traffic")).map(
          (line) => line.textContent?.trim() || "No line found"
        );
        const exit =
          station.querySelector(".txt_wayout")?.textContent?.trim() ||
          "No exit info found";
        return {
          stationName,
          lines,
          exit,
        };
      });
      // 버스 정류장 정보 추출
      const busStations = Array.from(
        document.querySelectorAll(".station_ride .ride_wayout")
      ).map((station) => {
        const busStopElement = station.querySelector(".link_wayout");
        const busStopName =
          busStopElement?.querySelector(".txt_busstop")?.textContent?.trim() ||
          "No bus stop name found";
        const busStopNumber =
          busStopElement?.querySelector(".txt_number")?.textContent?.trim() ||
          "No bus stop number found";
        const distance =
          busStopElement
            ?.querySelector(".txt_number span:last-child")
            ?.textContent?.trim() || "No distance found";
        const busInfo = Array.from(
          station.querySelectorAll(".list_ride li")
        ).map((bus) => {
          const busType =
            bus.querySelector("em")?.textContent?.trim() || "No bus type found";
          const busNumbers =
            bus.querySelector(".num_ride")?.textContent?.trim() ||
            "No bus numbers found";
          return {
            busType,
            busNumbers,
          };
        });

        return {
          busStopName,
          busStopNumber,
          distance,
          busInfo,
        };
      });

      // 배경 이미지 URL 추출
      const backgroundImageElement = document.querySelector(".bg_present");
      const backgroundImageStyle =
        backgroundImageElement?.getAttribute("style") || "";
      const backgroundImageUrlMatch = backgroundImageStyle.match(
        /url\(["']?(.*?)["']?\)/
      );
      let backgroundImageUrl = backgroundImageUrlMatch
        ? backgroundImageUrlMatch[1]
        : "/";
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
        ogUrl,
        linkHomepage,
        ogTitle,
        description,
        imageUrl,
        operationTime,
        contactNumber,
        holiday,
        closedDay,
        filteredTags,
        address,
        backgroundImageUrl,
        addressDetail,
        reviewCount,
        reviewTarget,
        reviewScore,
        busStations, // 찾아가는 길 하위의 지하철/버스 정보 추가
        subwayStations,
        menus,
      };
    });

    await browser.close();

    res.status(200).json(data);
  } catch (error) {
    console.error("Error scraping data:", error);
    res.status(500).json({ error: error });
  }
}
