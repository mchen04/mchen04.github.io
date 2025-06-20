/**
 * Zen Portfolio Experience Test
 * Tests the enhanced Japanese minimalist zen elements and their impact on user experience
 */

const puppeteer = require('puppeteer');
const path = require('path');

class ZenPortfolioTester {
  constructor() {
    this.browser = null;
    this.page = null;
    this.results = {
      zenElements: [],
      animations: [],
      interactions: [],
      performance: {},
      accessibility: {},
      userExperience: {}
    };
  }

  async initialize() {
    console.log('🎋 Initializing Zen Portfolio Test Suite...');
    
    this.browser = await puppeteer.launch({
      headless: false, // Visual testing for zen aesthetics
      defaultViewport: { width: 1920, height: 1080 },
      args: ['--enable-font-antialiasing', '--enable-smooth-scrolling']
    });
    
    this.page = await this.browser.newPage();
    
    // Enable performance monitoring
    await this.page.setCacheEnabled(false);
    await this.page.coverage.startJSCoverage();
    await this.page.coverage.startCSSCoverage();
    
    // Load the portfolio
    const filePath = path.join(__dirname, 'index.html');
    await this.page.goto(`file://${filePath}`, { 
      waitUntil: 'networkidle0' 
    });
    
    console.log('✅ Portfolio loaded successfully');
  }

  async testZenElements() {
    console.log('\n🎨 Testing Zen Visual Elements...');
    
    // Test Enso Circles
    const ensoCircles = await this.page.$$('.enso-circle');
    this.results.zenElements.push({
      element: 'Enso Circles',
      count: ensoCircles.length,
      expected: '>= 3',
      passed: ensoCircles.length >= 3
    });
    
    // Test Stone Garden Flow Lines
    const flowLines = await this.page.$$('.zen-flow-line');
    this.results.zenElements.push({
      element: 'Stone Garden Flow Lines',
      count: flowLines.length,
      expected: '>= 3',
      passed: flowLines.length >= 3
    });
    
    // Test Zen Pebbles
    const pebbles = await this.page.$$('.zen-pebble');
    this.results.zenElements.push({
      element: 'Zen Pebbles',
      count: pebbles.length,
      expected: '>= 6',
      passed: pebbles.length >= 6
    });
    
    // Test Ink Strokes
    const inkStrokes = await this.page.$$('.ink-stroke');
    this.results.zenElements.push({
      element: 'Ink Brush Strokes',
      count: inkStrokes.length,
      expected: '>= 3',
      passed: inkStrokes.length >= 3
    });
    
    // Test Mountain Silhouettes
    const mountains = await this.page.$$('.mountain-silhouette');
    this.results.zenElements.push({
      element: 'Mountain Silhouettes',
      count: mountains.length,
      expected: '>= 1',
      passed: mountains.length >= 1
    });
    
    // Test Water Ripples
    const ripples = await this.page.$$('.water-ripple');
    this.results.zenElements.push({
      element: 'Water Ripples',
      count: ripples.length,
      expected: '>= 3',
      passed: ripples.length >= 3
    });
    
    // Test Bamboo Sections
    const bambooSections = await this.page.$$('.bamboo-section');
    this.results.zenElements.push({
      element: 'Bamboo Sections',
      count: bambooSections.length,
      expected: '>= 5',
      passed: bambooSections.length >= 5
    });
    
    console.log('✅ Zen elements presence test completed');
  }

  async testAnimations() {
    console.log('\n🌊 Testing Zen Animations and Breathing Effects...');
    
    // Test breathing animation
    const breathingElements = await this.page.$$('.zen-breathing');
    for (const element of breathingElements) {
      const animationName = await element.evaluate(el => 
        getComputedStyle(el).animationName
      );
      
      this.results.animations.push({
        element: 'Breathing Animation',
        hasAnimation: animationName !== 'none',
        animationName: animationName
      });
    }
    
    // Test zen element animations
    const zenAnimatedElements = await this.page.$$('.enso-circle, .zen-flow-line, .ink-stroke');
    for (const element of zenAnimatedElements) {
      const animationName = await element.evaluate(el => 
        getComputedStyle(el).animationName
      );
      
      this.results.animations.push({
        element: 'Zen Element Animation',
        hasAnimation: animationName !== 'none',
        animationName: animationName
      });
    }
    
    console.log('✅ Animation tests completed');
  }

  async testInteractiveZenElements() {
    console.log('\n🎯 Testing Interactive Zen Elements...');
    
    // Test zen ripple creation on click
    const heroSection = await this.page.$('.hero');
    if (heroSection) {
      // Click to create zen ripple
      await heroSection.click();
      
      // Wait for ripple to appear
      await this.page.waitForTimeout(500);
      
      const rippleCreated = await this.page.$('.interactive-zen-ripple');
      this.results.interactions.push({
        test: 'Zen Ripple Creation',
        passed: !!rippleCreated,
        description: 'Click creates zen ripple effect'
      });
    }
    
    // Test parallax scrolling effects
    await this.page.evaluate(() => window.scrollTo(0, 500));
    await this.page.waitForTimeout(500);
    
    const zenElement = await this.page.$('.enso-circle');
    if (zenElement) {
      const transform = await zenElement.evaluate(el => 
        getComputedStyle(el).transform
      );
      
      this.results.interactions.push({
        test: 'Zen Parallax Effect',
        passed: transform && transform !== 'none',
        description: 'Zen elements respond to scroll with parallax'
      });
    }
    
    console.log('✅ Interactive zen element tests completed');
  }

  async testPerformance() {
    console.log('\n⚡ Testing Performance Impact of Zen Elements...');
    
    const metrics = await this.page.metrics();
    
    // Test Core Web Vitals
    const paintMetrics = await this.page.evaluate(() => {
      const entries = performance.getEntriesByType('paint');
      return entries.reduce((acc, entry) => {
        acc[entry.name] = entry.startTime;
        return acc;
      }, {});
    });
    
    this.results.performance = {
      jsHeapUsedSize: Math.round(metrics.JSHeapUsedSize / 1024 / 1024), // MB
      jsHeapTotalSize: Math.round(metrics.JSHeapTotalSize / 1024 / 1024), // MB
      firstPaint: paintMetrics['first-paint'] || 0,
      firstContentfulPaint: paintMetrics['first-contentful-paint'] || 0,
      domNodes: metrics.Nodes,
      memoryEfficient: metrics.JSHeapUsedSize < 50 * 1024 * 1024, // Under 50MB
      performant: (paintMetrics['first-contentful-paint'] || 0) < 2000 // Under 2s
    };
    
    console.log('✅ Performance tests completed');
  }

  async testAccessibility() {
    console.log('\n♿ Testing Accessibility with Zen Elements...');
    
    // Test reduced motion preferences
    await this.page.emulateMediaFeatures([
      { name: 'prefers-reduced-motion', value: 'reduce' }
    ]);
    
    const reducedMotionZenElement = await this.page.$('.enso-circle');
    if (reducedMotionZenElement) {
      const animationDuration = await reducedMotionZenElement.evaluate(el => 
        getComputedStyle(el).animationDuration
      );
      
      this.results.accessibility.reducedMotionRespected = 
        animationDuration === '0.01s' || animationDuration === '0s';
    }
    
    // Test focus states
    await this.page.focus('.nav-link');
    const focusedElement = await this.page.$(':focus');
    this.results.accessibility.focusStatesWork = !!focusedElement;
    
    // Test keyboard navigation
    await this.page.keyboard.press('Tab');
    const tabNavigation = await this.page.$(':focus');
    this.results.accessibility.keyboardNavigation = !!tabNavigation;
    
    console.log('✅ Accessibility tests completed');
  }

  async testUserExperience() {
    console.log('\n🧘 Testing Overall Zen User Experience...');
    
    // Test visual hierarchy with golden ratio
    const goldenSections = await this.page.$$('.golden-section');
    this.results.userExperience.goldenRatioLayout = goldenSections.length > 0;
    
    // Test asymmetrical balance
    const goldenSplits = await this.page.$$('.golden-split');
    this.results.userExperience.asymmetricalBalance = goldenSplits.length > 0;
    
    // Test breathing rhythm elements
    const breathingElements = await this.page.$$('.zen-breathing');
    this.results.userExperience.breathingRhythm = breathingElements.length > 0;
    
    // Test zen color palette usage
    const primaryColor = await this.page.evaluate(() => 
      getComputedStyle(document.documentElement).getPropertyValue('--color-sumi')
    );
    this.results.userExperience.zenColorPalette = primaryColor.includes('#2c2c2c');
    
    // Test section transitions and bamboo structure
    const bambooSections = await this.page.$$('.bamboo-section');
    this.results.userExperience.bambooStructure = bambooSections.length >= 5;
    
    console.log('✅ User experience tests completed');
  }

  generateReport() {
    console.log('\n📊 ZEN PORTFOLIO TEST REPORT');
    console.log('================================\n');
    
    // Zen Elements Report
    console.log('🎨 ZEN VISUAL ELEMENTS:');
    this.results.zenElements.forEach(test => {
      const status = test.passed ? '✅' : '❌';
      console.log(`  ${status} ${test.element}: ${test.count} (expected ${test.expected})`);
    });
    
    // Animations Report
    console.log('\n🌊 ZEN ANIMATIONS:');
    const animationTests = this.results.animations.reduce((acc, anim) => {
      if (!acc[anim.element]) acc[anim.element] = 0;
      if (anim.hasAnimation) acc[anim.element]++;
      return acc;
    }, {});
    
    Object.entries(animationTests).forEach(([element, count]) => {
      console.log(`  ✅ ${element}: ${count} elements animated`);
    });
    
    // Interactions Report
    console.log('\n🎯 ZEN INTERACTIONS:');
    this.results.interactions.forEach(test => {
      const status = test.passed ? '✅' : '❌';
      console.log(`  ${status} ${test.test}: ${test.description}`);
    });
    
    // Performance Report
    console.log('\n⚡ PERFORMANCE:');
    const perf = this.results.performance;
    console.log(`  ✅ Memory Usage: ${perf.jsHeapUsedSize}MB / ${perf.jsHeapTotalSize}MB`);
    console.log(`  ${perf.performant ? '✅' : '❌'} First Contentful Paint: ${Math.round(perf.firstContentfulPaint)}ms`);
    console.log(`  ${perf.memoryEfficient ? '✅' : '❌'} Memory Efficient: ${perf.memoryEfficient}`);
    console.log(`  ✅ DOM Nodes: ${perf.domNodes}`);
    
    // Accessibility Report
    console.log('\n♿ ACCESSIBILITY:');
    const a11y = this.results.accessibility;
    console.log(`  ${a11y.reducedMotionRespected ? '✅' : '❌'} Reduced Motion Respected`);
    console.log(`  ${a11y.focusStatesWork ? '✅' : '❌'} Focus States Work`);
    console.log(`  ${a11y.keyboardNavigation ? '✅' : '❌'} Keyboard Navigation`);
    
    // User Experience Report
    console.log('\n🧘 ZEN USER EXPERIENCE:');
    const ux = this.results.userExperience;
    console.log(`  ${ux.goldenRatioLayout ? '✅' : '❌'} Golden Ratio Layout`);
    console.log(`  ${ux.asymmetricalBalance ? '✅' : '❌'} Asymmetrical Balance`);
    console.log(`  ${ux.breathingRhythm ? '✅' : '❌'} Breathing Rhythm Elements`);
    console.log(`  ${ux.zenColorPalette ? '✅' : '❌'} Zen Color Palette`);
    console.log(`  ${ux.bambooStructure ? '✅' : '❌'} Bamboo Section Structure`);
    
    // Overall Score
    const totalTests = [
      ...this.results.zenElements,
      ...this.results.interactions,
      Object.values(this.results.performance).filter(v => typeof v === 'boolean'),
      Object.values(this.results.accessibility),
      Object.values(this.results.userExperience)
    ].flat();
    
    const passedTests = totalTests.filter(test => 
      typeof test === 'boolean' ? test : test.passed
    ).length;
    
    const score = Math.round((passedTests / totalTests.length) * 100);
    
    console.log(`\n🏆 OVERALL ZEN SCORE: ${score}%`);
    
    if (score >= 90) {
      console.log('🎋 EXCELLENT: Your portfolio embodies true zen philosophy!');
    } else if (score >= 80) {
      console.log('🌸 GOOD: Strong zen elements with room for refinement');
    } else if (score >= 70) {
      console.log('🍃 FAIR: Basic zen elements present, needs enhancement');
    } else {
      console.log('🌱 NEEDS WORK: Zen elements need significant improvement');
    }
    
    console.log('\n================================');
  }

  async runAllTests() {
    try {
      await this.initialize();
      await this.testZenElements();
      await this.testAnimations();
      await this.testInteractiveZenElements();
      await this.testPerformance();
      await this.testAccessibility();
      await this.testUserExperience();
      
      this.generateReport();
      
    } catch (error) {
      console.error('❌ Test failed:', error);
    } finally {
      if (this.browser) {
        await this.browser.close();
      }
    }
  }
}

// Run the tests if this file is executed directly
if (require.main === module) {
  const tester = new ZenPortfolioTester();
  tester.runAllTests().catch(console.error);
}

module.exports = ZenPortfolioTester;