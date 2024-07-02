import puppeteer from "puppeteer";

// Puppeteer 브라우저와 페이지를 설정하는 헬퍼 함수
export async function setupBrowser() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  return { browser, page };
}

// 특정 선택자의 텍스트 콘텐츠를 가져오는 헬퍼 함수
export async function getTextContent(page: puppeteer.Page, selector: string) {
  return await page.evaluate((sel) => {
    const element = document.querySelector(sel);
    return element ? element.textContent.trim() : null;
  }, selector);
}

// 특정 선택자의 속성 값을 가져오는 헬퍼 함수
export async function getAttribute(
  page: puppeteer.Page,
  selector: string,
  attribute: string
) {
  return await page.evaluate(
    (sel, attr) => {
      const element = document.querySelector(sel);
      return element ? element.getAttribute(attr) : null;
    },
    selector,
    attribute
  );
}
export async function getAllTextContent(
  page: Page,
  selector: string
): Promise<string[]> {
  return await page.evaluate((sel) => {
    const elements = document.querySelectorAll(sel);
    return Array.from(elements).map((element) => element.textContent.trim());
  }, selector);
}

export async function getMenuItems(
  page: Page,
  menuSelector: string,
  priceSelector: string
): Promise<{ menu: string; price: string }[]> {
  return await page.evaluate(
    (menuSel, priceSel) => {
      const menuElements = document.querySelectorAll(menuSel);
      const priceElements = document.querySelectorAll(priceSel);
      let menuItems = [];
      for (let i = 0; i < menuElements.length; i++) {
        let menu = menuElements[i].textContent.trim();
        let price = priceElements[i].textContent.trim();
        menuItems.push({ menu, price });
      }
      return menuItems;
    },
    menuSelector,
    priceSelector
  );
}
