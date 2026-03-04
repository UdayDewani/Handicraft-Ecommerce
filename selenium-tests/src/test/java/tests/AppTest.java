package tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.testng.Assert;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

public class AppTest {

    WebDriver driver;

    @BeforeTest
    public void setup() {
        // Automatically downloads the right ChromeDriver version
        WebDriverManager.chromedriver().setup();

        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");           // don't open visible browser
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");

        driver = new ChromeDriver(options);
        System.out.println("Browser started successfully");
    }

    @Test(priority = 1)
    public void testWebsiteLoads() {
        driver.get("https://www.google.com");
        String title = driver.getTitle();
        System.out.println("Page Title: " + title);
        Assert.assertTrue(title.contains("Google"), "Title should contain Google");
    }

    @Test(priority = 2)
    public void testSearchBarExists() {
        driver.get("https://www.google.com");
        WebElement searchBox = driver.findElement(By.name("q"));
        Assert.assertTrue(searchBox.isDisplayed(), "Search box should be visible");
        System.out.println("Search bar found on page");
    }

    @Test(priority = 3)
    public void testPageSourceNotEmpty() {
        driver.get("https://www.google.com");
        String source = driver.getPageSource();
        Assert.assertNotNull(source, "Page source should not be null");
        Assert.assertFalse(source.isEmpty(), "Page source should not be empty");
        System.out.println("Page source verified");
    }

    @AfterTest
    public void teardown() {
        if (driver != null) {
            driver.quit();
            System.out.println("Browser closed");
        }
    }
}
```

