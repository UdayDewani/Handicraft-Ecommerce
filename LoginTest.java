import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.Test;

public class LoginTest {

    @Test
    public void sellerLoginTest() throws InterruptedException {

        WebDriver driver = new ChromeDriver();

        driver.get("http://localhost:3000/Sellerlogin");

        driver.manage().window().maximize();

        // Enter Email
        driver.findElement(By.id("email"))
                .sendKeys("seller1@gmail.com");

        // Enter Password
        driver.findElement(By.id("password"))
                .sendKeys("abc");

        // Click Login Button
        driver.findElement(By.xpath("//button[@type='submit']"))
                .click();

        Thread.sleep(3000);  // wait for login

        // Verify login success (check if dashboard text exists)
        String pageSource = driver.getPageSource();
        Assert.assertTrue(pageSource.contains("SHOPCART"));

        driver.quit();
    }
}