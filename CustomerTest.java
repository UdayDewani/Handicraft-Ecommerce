import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;

import org.testng.Assert;
import org.testng.annotations.*;

import java.time.Duration;

public class CustomerTest {

    WebDriver driver;
    WebDriverWait wait;

    @BeforeClass
    public void setup() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        wait = new WebDriverWait(driver, Duration.ofSeconds(20));
    }
//======================
//========================================================================================
//========================================================================================
//========================================================================================
//========================================================================================
   @Test
    public void completeCustomerFlow() {

        // ======================
// 1️⃣ LOGIN
// ======================
driver.get("http://localhost:3000/Customerlogin");

wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("email")))
        .sendKeys("cus2@gmail.com");

driver.findElement(By.id("password")).sendKeys("abc");
driver.findElement(By.xpath("//button[@type='submit']")).click();

// ✅ Wait for URL to change after login
wait.until(ExpectedConditions.not(
        ExpectedConditions.urlContains("Customerlogin")
));

// ✅ Wait until search box is present in DOM
wait.until(ExpectedConditions.presenceOfElementLocated(
        By.xpath("//input[@placeholder='Search for products, brands and more']")
));

// ======================
// 2️⃣ SEARCH PRODUCT
// ======================

// 🔥 IMPORTANT: Find element FRESH right before typing
By searchLocator = By.xpath("//input[@placeholder='Search for products, brands and more']");

// Wait until it is clickable (not just visible)
wait.until(ExpectedConditions.elementToBeClickable(searchLocator));

// Now type
driver.findElement(searchLocator).sendKeys("Flying Eagle");
driver.findElement(searchLocator).sendKeys(Keys.ENTER);

        // ======================
        // 3️⃣ ADD TO CART
        // ======================
        wait.until(ExpectedConditions.elementToBeClickable(
                By.xpath("//button[contains(text(),'Add To Cart')]")
        )).click();

        // ======================
        // 4️⃣ OPEN CART
        // ======================
        wait.until(ExpectedConditions.elementToBeClickable(
                By.xpath("//button[@aria-label='Cart']")
        )).click();

        // ======================
        // 5️⃣ BUY ALL
        // ======================
        WebElement buyAllBtn = wait.until(ExpectedConditions.presenceOfElementLocated(
                By.xpath("//button[contains(text(),'Buy All')]")
        ));

        ((JavascriptExecutor) driver)
                .executeScript("arguments[0].scrollIntoView({block: 'center'});", buyAllBtn);

        wait.until(ExpectedConditions.elementToBeClickable(buyAllBtn));

        ((JavascriptExecutor) driver)
                .executeScript("arguments[0].click();", buyAllBtn);

        // ======================
        // 6️⃣ SHIPPING
        // ======================
        // wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("address")))
        //         .sendKeys("Mumbai Road 101");

        // driver.findElement(By.id("city")).sendKeys("Mumbai");
        // driver.findElement(By.id("pinCode")).sendKeys("400001");
        // driver.findElement(By.id("country")).sendKeys("India");
        // driver.findElement(By.id("state")).sendKeys("Maharashtra");
        // driver.findElement(By.id("phoneNo")).sendKeys("9876543210");

        By nextButton = By.xpath("//button[contains(.,'Next')]");

wait.until(ExpectedConditions.elementToBeClickable(nextButton)).click();

        // ======================
        // 7️⃣ ORDER SUMMARY
        // ======================
        wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("//*[contains(text(),'Flying Eagle')]")
        ));

        

wait.until(ExpectedConditions.elementToBeClickable(nextButton)).click();

        // ======================
// ======================
//  PAYMENT SECTION
// ======================

// Wait until cardName field is visible
wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("cardName")));

// Fill payment details
driver.findElement(By.id("cardName"))
        .sendKeys("Ria Thadani");

driver.findElement(By.id("cardNumber"))
        .sendKeys("4111111111111111");

// ⚠ Important: type="date" requires yyyy-mm-dd format
driver.findElement(By.id("expDate"))
        .sendKeys("2028-12-01");

driver.findElement(By.id("cvv"))
        .sendKeys("123");

// Click Place Order (type='submit')
driver.findElement(By.xpath("//button[@type='submit']"))
        .click();

        // ======================
        // 9️⃣ GO TO MY ORDERS
        // ======================
        wait.until(ExpectedConditions.elementToBeClickable(
                By.xpath("//button[@aria-label='Account settings']")
        )).click();

        wait.until(ExpectedConditions.elementToBeClickable(
                By.xpath("//a[contains(text(),'My Orders')]")
        )).click();

        // ======================
        // 🔟 VERIFY ORDER
        // ======================
        WebElement orderItem = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("//*[contains(text(),'Flying Eagle')]")
        ));

        Assert.assertTrue(orderItem.isDisplayed());

        System.out.println("Order placed successfully!");
    }

    @AfterClass
    public void tearDown() {
        driver.quit();
    }
}