const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
var { setDefaultTimeout } = require("cucumber");
const { clickElement, getText } = require("../../lib/commands.js");
const { randomDay, randonTime, randomPlace } = require("../../lib/util.js");
setDefaultTimeout(60 * 1000);

let day = randomDay();
let time = randonTime();
let place = randomPlace();
let button = "button.acceptin-button";

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("The user is on the page {string}", async function (string) {
  return await this.page.goto(`${string}`);
});

When("The user reserves one seat in the hall", async function () {
  const actualPage = await getText(this.page, "h1.page-header__title");
  const expectedPage = "Идёмвкино";
  expect(actualPage).contains(expectedPage);

  await clickElement(this.page, randomDay());
  await clickElement(this.page, randonTime());
  await clickElement(this.page, randomPlace());
  await clickElement(this.page, button);

  const actual = await getText(this.page, "h2.ticket__check-title");
  const expected = "Вы выбрали билеты:";
  expect(actual).contains(expected);
  await clickElement(this.page, button);
});

When("The user reserves two seats in the hall", async function () {
  const actualPage = await getText(this.page, "h1.page-header__title");
  const expectedPage = "Идёмвкино";
  expect(actualPage).contains(expectedPage);

  await clickElement(this.page, randomDay());
  await clickElement(this.page, randonTime());
  await clickElement(this.page, randomPlace());
  await clickElement(this.page, randomPlace());
  await clickElement(this.page, button);

  const actual = await getText(this.page, "h2.ticket__check-title");
  const expected = "Вы выбрали билеты:";
  expect(actual).contains(expected);
  await clickElement(this.page, button);
});

When("The user reserves the reserved seat", async function () {
  const actualPage = await getText(this.page, "h1.page-header__title");
  const expectedPage = "Идёмвкино";
  expect(actualPage).contains(expectedPage);

  await clickElement(this.page, day);
  await clickElement(this.page, time);
  await clickElement(this.page, place);
  await clickElement(this.page, button);

  const actual = await getText(this.page, "h2.ticket__check-title");
  const expected = "Вы выбрали билеты:";
  expect(actual).contains(expected);
  await clickElement(this.page, button);

  const actualText = await getText(this.page, "h2.ticket__check-title");
  const expectText = "Электронный билет";
  expect(actualText).contains(expectText);

  await this.page.goto("http://qamid.tmweb.ru/client/index.php");
  await clickElement(this.page, day);
  await clickElement(this.page, time);
  await clickElement(this.page, place);
});

Then("The user received an electronic ticket", async function () {
  const actualText = await getText(this.page, "h2.ticket__check-title");
  const expectText = "Электронный билет";
  expect(actualText).contains(expectText);
});

Then("The user cannot book the reserved seat", async function () {
  const actual = String(
    await this.page.$eval("button", (button) => {
      return button.disabled;
    })
  );
  const expected = "true";
  expect(actual).contains(expected);
});
