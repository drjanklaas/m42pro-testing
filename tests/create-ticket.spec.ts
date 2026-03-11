  await page.goto('itsm/');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('admin1.training');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).press('ControlOrMeta+v');
  await page.getByRole('textbox', { name: 'Password' }).fill('MySecureRandomPassword1!');
  await page.getByRole('button', { name: 'Login with Directory account' }).click();

  await page.waitForLoadState('domcontentloaded');

  const terminateButton = page.locator('input[name="kickoutButton"]');

  try {
    await terminateButton.waitFor({ state: 'visible', timeout: 5000 });
    await terminateButton.click();
  } catch {
    // terminate dialog not shown, continue normally
  }

  await page.waitForTimeout(7000);

  await expect(page.locator('[data-test="header-logo"]')).toBeVisible();
  await page.getByRole('button', { name: 'Switch to Classic UI' }).click();
  await page.getByText('Service Desk Agent').click();
  await page.getByText('02. My Open Tickets with').click();
  await page.getByLabel('Create new data card from').click();
  //await page.getByRole('button', { name: 'New' }).click();
  await page.waitForTimeout(3000);

  await page.locator('[id="s2id_staticis-{{::data.gaId}}"] > .select2-choice').first().click();
  await page.getByRole('option', { name: 'Incident' }).click();
  await page.locator('#input-7792739').click();
  await page.locator('#input-7792739').fill('test42');
  await page.locator('.select2-container.focusable.ng-pristine.ng-untouched.ng-valid.ng-empty.formInvalid > .select2-choice').first().click();
  await page.getByRole('option', { name: 'Albrecht Peter' }).click();
  await page.locator('.select2-container.focusable.ng-pristine.ng-untouched.ng-valid.ng-empty.formInvalid > .select2-choice').click();
  await page.getByRole('option', { name: 'Facility Team' }).click();
  await page.getByRole('button', { name: 'Save' }).click();


  await expect(page.locator('#group-7792205')).toContainText('Ticket description');
  await expect(page.locator('#workspace-handler-attribute-7792739')).toContainText('test42');
  await expect(page.locator('#workspace-handler-attribute-7793318')).toContainText('Albrecht Peter');
