# Luxe Quality | Golotaystrov Denis

## 📁 Project Structure

All automated test files are located in the following folder: test/specs

---

## 📊 Allure Report — Beautiful Test Results Report

This project uses **Allure Report** for visually analyzing test results.

### 📦 Installing Allure

To view the test reports, you need to install Allure on your machine. Here are two options:

- Official documentation:  
  👉 [https://webdriver.io/docs/allure-reporter](https://webdriver.io/docs/allure-reporter)

- Installation video tutorial (YouTube):  
  ▶️ [https://www.youtube.com/watch?v=sx7YZjurKwk](https://www.youtube.com/watch?v=sx7YZjurKwk)

---

1. Make sure you have installed dependencies:
   ```bash
   npm install

2.Run the tests:
  ```bash 
  npm run wdio
```
3.After tests finish running, generate and open the Allure report:
  ```bash 
  allure open
```
A web page will open where you can see:
  * Which tests passed or failed
  * Detailed error messages and stack traces
  * Screenshots on test failures
  * Execution time and other details

