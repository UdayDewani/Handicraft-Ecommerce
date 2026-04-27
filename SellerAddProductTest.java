import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.Test;

public class SellerAddProductTest {

@Test
public void sellerAddProductTest() throws InterruptedException {

    WebDriver driver = new ChromeDriver();
    driver.manage().window().maximize();
    driver.get("http://localhost:3000/Sellerlogin");

    // LOGIN
    driver.findElement(By.id("email")).sendKeys("seller3@gmail.com");
    driver.findElement(By.id("password")).sendKeys("abc");
    driver.findElement(By.xpath("//button[@type='submit']")).click();

    Thread.sleep(3000);

    // Click Sidebar (Orders page)
    driver.findElement(By.xpath("//a[@href='/Seller/orders']")).click();

    Thread.sleep(2000);

    // Click Add Products button
    driver.findElement(By.xpath("//button[contains(text(),'Add Products')]")).click();

    Thread.sleep(2000);

    // Fill Form
    driver.findElement(By.xpath("//label[contains(text(),'Product Image URL')]/following::input[1]"))
            .sendKeys("https://theknottyrope.com/cdn/shop/products/7_890600fd-1e77-4780-9725-bf7ba9fbc5d0.jpg?v=1611736762&width=1000");

    driver.findElement(By.xpath("//label[contains(text(),'Product Name')]/following::input[1]"))
            .sendKeys("Flying Eagle");

    driver.findElement(By.xpath("//label[contains(text(),'Description')]/following::textarea[1]"))
        .sendKeys("The Flying Eagle (Large). Made of metal. Beautiful home decor. Perfect for gifting");

    driver.findElement(By.xpath("//label[contains(text(),'MRP')]/following::input[1]"))
            .sendKeys("3000");

    driver.findElement(By.xpath("//label[contains(text(),'Cost')]/following::input[1]"))
            .sendKeys("2400");

    driver.findElement(By.xpath("//label[contains(text(),'Discount Percent')]/following::input[1]"))
            .sendKeys("20");

    driver.findElement(By.xpath("//label[contains(text(),'Category')]/following::input[1]"))
            .sendKeys("Statue");

    driver.findElement(By.xpath("//label[contains(text(),'Subcategory')]/following::input[1]"))
            .sendKeys("Animal");

    driver.findElement(By.xpath("//label[contains(text(),'Tagline')]/following::input[1]"))
            .sendKeys("Flying Eagle");

    // Submit
    driver.findElement(By.xpath("//button[@type='submit']")).click();

    Thread.sleep(3000);

    // Go to Products page
    driver.findElement(By.xpath("//a[@href='/Seller/products']")).click();

    Thread.sleep(3000);

    // Verify product exists
    Assert.assertTrue(driver.getPageSource().contains("Flying Eagle"));

    driver.quit();
}
}