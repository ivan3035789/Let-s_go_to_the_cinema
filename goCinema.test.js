const { clickElement, getText } = require("./lib/commands.js");
const { randonTime, randomDay, randomPlace } = require("./lib/util.js");
let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto("http://qamid.tmweb.ru/client/index.php");
  expect(await getText(page, "h1.page-header__title")).toContain("Идёмвкино");
});

afterEach(() => {
  page.close();
});

describe("qamid.tmweb.ru tests", () => {
  test("must successfully book one ticket", async () => {
    await clickElement(page, randomDay());
    await clickElement(page, randonTime());
    await clickElement(page, randomPlace());
    await clickElement(page, "button.acceptin-button");
    expect(await getText(page, "h2.ticket__check-title")).toContain(
      "Вы выбрали билеты:"
    );
    await clickElement(page, "button.acceptin-button");
    expect(await getText(page, "h2.ticket__check-title")).toContain(
      "Электронный билет"
    );
  });

  test("must successfully book multiple tickets", async () => {
    await clickElement(page, randomDay());
    await clickElement(page, randomDay());
    await clickElement(page, randonTime());
    await clickElement(page, randomPlace());
    await clickElement(page, randomPlace());
    await clickElement(page, "button.acceptin-button");
    expect(await getText(page, "h2.ticket__check-title")).toContain(
      "Вы выбрали билеты:"
    );
    await clickElement(page, "button.acceptin-button");
    expect(await getText(page, "h2.ticket__check-title")).toContain(
      "Электронный билет"
    );
  });

  test("must not book booked tickets", async () => {
    let day = randomDay();
    let time = randonTime();
    let place = randomPlace();
    await clickElement(page, day);
    await clickElement(page, time);
    await clickElement(page, place);
    await clickElement(page, "button.acceptin-button");
    expect(await getText(page, "h2.ticket__check-title")).toContain(
      "Вы выбрали билеты:"
    );
    await clickElement(page, "button.acceptin-button");
    expect(await getText(page, "h2.ticket__check-title")).toContain(
      "Электронный билет"
    );

    await page.goto("http://qamid.tmweb.ru/client/index.php");
    await clickElement(page, day);
    await clickElement(page, time);
    await clickElement(page, place);
    expect(
      String(
        await page.$eval("button", (button) => {
          return button.disabled;
        })
      )
    ).toContain("true");
  });
});
