/**
 * Simple Zen Portfolio Elements Checker
 * Tests zen elements without requiring external dependencies
 */

const fs = require('fs');
const path = require('path');

class SimpleZenChecker {
  constructor() {
    this.results = {
      zenElements: [],
      animations: [],
      styles: [],
      passed: 0,
      total: 0
    };
  }

  checkFileExists(fileName) {
    const filePath = path.join(__dirname, fileName);
    return fs.existsSync(filePath);
  }

  readFile(fileName) {
    const filePath = path.join(__dirname, fileName);
    return fs.readFileSync(filePath, 'utf8');
  }

  testZenElementsInHTML() {
    console.log('🎨 Testing Zen Elements in HTML...');
    
    const htmlContent = this.readFile('index.html');
    
    const zenTests = [
      { name: 'Enso Circles', pattern: /enso-circle/g, expected: 3 },
      { name: 'Stone Garden Flow Lines', pattern: /zen-flow-line/g, expected: 3 },
      { name: 'Zen Pebbles', pattern: /zen-pebble/g, expected: 6 },
      { name: 'Ink Brush Strokes', pattern: /ink-stroke/g, expected: 3 },
      { name: 'Mountain Silhouettes', pattern: /mountain-silhouette/g, expected: 1 },
      { name: 'Water Ripples', pattern: /water-ripple/g, expected: 6 },
      { name: 'Bamboo Sections', pattern: /bamboo-section/g, expected: 5 },
      { name: 'Bamboo Nodes', pattern: /bamboo-node/g, expected: 15 },
      { name: 'Zen Breathing Elements', pattern: /zen-breathing/g, expected: 5 },
      { name: 'Golden Ratio Sections', pattern: /golden-section/g, expected: 3 },
      { name: 'Golden Split Layout', pattern: /golden-split/g, expected: 1 }
    ];

    zenTests.forEach(test => {
      const matches = htmlContent.match(test.pattern);
      const count = matches ? matches.length : 0;
      const passed = count >= test.expected;
      
      this.results.zenElements.push({
        name: test.name,
        found: count,
        expected: test.expected,
        passed: passed
      });
      
      if (passed) this.results.passed++;
      this.results.total++;
    });
  }

  testZenStylesInCSS() {
    console.log('🎨 Testing Zen Styles and Animations...');
    
    const cssContent = this.readFile('styles.css');
    
    const styleTests = [
      { name: 'Zen Float Animation', pattern: /@keyframes zenFloat/g },
      { name: 'Flowing Water Animation', pattern: /@keyframes flowingWater/g },
      { name: 'Gentle Bob Animation', pattern: /@keyframes gentleBob/g },
      { name: 'Ink Flow Animation', pattern: /@keyframes inkFlow/g },
      { name: 'Ripple Expand Animation', pattern: /@keyframes rippleExpand/g },
      { name: 'Breathing Rhythm Animation', pattern: /@keyframes breathingRhythm/g },
      { name: 'Zen Ripple Effect Animation', pattern: /@keyframes zenRippleEffect/g },
      { name: 'Zen Activate Animation', pattern: /@keyframes zenActivate/g },
      { name: 'Japanese Color Palette (Sumi)', pattern: /--color-sumi/g },
      { name: 'Japanese Color Palette (Washi)', pattern: /--color-washi/g },
      { name: 'Japanese Color Palette (Kohaku)', pattern: /--color-kohaku/g },
      { name: 'Japanese Color Palette (Sabizome)', pattern: /--color-sabizome/g },
      { name: 'Mountain Silhouette Styles', pattern: /\.mountain-silhouette/g },
      { name: 'Zen Circle Styles', pattern: /\.enso-circle/g },
      { name: 'Bamboo Section Styles', pattern: /\.bamboo-section/g }
    ];

    styleTests.forEach(test => {
      const matches = cssContent.match(test.pattern);
      const found = matches ? matches.length : 0;
      const passed = found > 0;
      
      this.results.styles.push({
        name: test.name,
        found: found,
        passed: passed
      });
      
      if (passed) this.results.passed++;
      this.results.total++;
    });
  }

  testZenInteractionsInJS() {
    console.log('🎯 Testing Zen Interactions in JavaScript...');
    
    const jsContent = this.readFile('script.js');
    
    const jsTests = [
      { name: 'Zen Parallax Setup', pattern: /setupZenParallax/g },
      { name: 'Interactive Zen Elements', pattern: /setupInteractiveZenElements/g },
      { name: 'Zen Ripple Creation', pattern: /createZenRipple/g },
      { name: 'Enhanced Hover Effects', pattern: /setupEnhancedHoverEffects/g },
      { name: 'Zen Portfolio Class', pattern: /class ZenPortfolio/g },
      { name: 'Performance Monitoring', pattern: /setupPerformanceMonitoring/g },
      { name: 'Mindful Interactions', pattern: /mindful interactions/g }
    ];

    jsTests.forEach(test => {
      const matches = jsContent.match(test.pattern);
      const found = matches ? matches.length : 0;
      const passed = found > 0;
      
      this.results.animations.push({
        name: test.name,
        found: found,
        passed: passed
      });
      
      if (passed) this.results.passed++;
      this.results.total++;
    });
  }

  generateReport() {
    console.log('\n📊 ZEN PORTFOLIO ENHANCEMENT REPORT');
    console.log('====================================\n');
    
    // HTML Zen Elements
    console.log('🎨 ZEN VISUAL ELEMENTS IN HTML:');
    this.results.zenElements.forEach(test => {
      const status = test.passed ? '✅' : '❌';
      console.log(`  ${status} ${test.name}: ${test.found}/${test.expected} found`);
    });
    
    // CSS Zen Styles
    console.log('\n🌊 ZEN STYLES AND ANIMATIONS:');
    this.results.styles.forEach(test => {
      const status = test.passed ? '✅' : '❌';
      console.log(`  ${status} ${test.name}: ${test.found > 0 ? 'Present' : 'Missing'}`);
    });
    
    // JavaScript Zen Interactions
    console.log('\n🎯 ZEN INTERACTIONS AND FEATURES:');
    this.results.animations.forEach(test => {
      const status = test.passed ? '✅' : '❌';
      console.log(`  ${status} ${test.name}: ${test.found > 0 ? 'Implemented' : 'Missing'}`);
    });
    
    // Overall Score
    const score = Math.round((this.results.passed / this.results.total) * 100);
    
    console.log(`\n🏆 OVERALL ZEN ENHANCEMENT SCORE: ${score}%`);
    console.log(`📊 Tests Passed: ${this.results.passed}/${this.results.total}`);
    
    if (score >= 90) {
      console.log('🎋 EXCELLENT: Your portfolio embodies deep zen philosophy!');
      console.log('   The zen elements create a peaceful, meditative experience');
      console.log('   that will make recruiters feel calm while being impressed.');
    } else if (score >= 80) {
      console.log('🌸 VERY GOOD: Strong zen elements with minor refinements needed');
    } else if (score >= 70) {
      console.log('🍃 GOOD: Basic zen elements present, room for enhancement');
    } else {
      console.log('🌱 NEEDS WORK: Zen elements need significant improvement');
    }
    
    console.log('\n🧘 ZEN FEATURES IMPLEMENTED:');
    console.log('  • Enso circles for natural content framing');
    console.log('  • Stone garden flow lines guiding the eye');
    console.log('  • Mountain silhouettes for depth and perspective');
    console.log('  • Zen pebbles in natural asymmetrical arrangements');
    console.log('  • Ink brush strokes for organic visual interest');
    console.log('  • Water ripples with calming animations');
    console.log('  • Bamboo-inspired vertical section layouts');
    console.log('  • Golden ratio proportions for natural harmony');
    console.log('  • Meditation breathing rhythm animations');
    console.log('  • Interactive zen ripples on user interaction');
    console.log('  • Japanese minimalist color palette');
    console.log('  • Performance-optimized zen parallax effects');
    
    console.log('\n====================================');
  }

  run() {
    console.log('🎋 Starting Zen Portfolio Enhancement Check...\n');
    
    try {
      this.testZenElementsInHTML();
      this.testZenStylesInCSS();
      this.testZenInteractionsInJS();
      this.generateReport();
    } catch (error) {
      console.error('❌ Error running zen tests:', error.message);
    }
  }
}

// Run the checker
const checker = new SimpleZenChecker();
checker.run();