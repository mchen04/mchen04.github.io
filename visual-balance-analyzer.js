/**
 * Visual Balance Analyzer for Zen Portfolio
 * Analyzes design principles: balance, hierarchy, proportion, rhythm, emphasis, unity
 */

const fs = require('fs');
const path = require('path');

class VisualBalanceAnalyzer {
  constructor() {
    this.results = {
      symmetricalBalance: [],
      asymmetricalBalance: [],
      visualHierarchy: [],
      proportions: [],
      rhythm: [],
      emphasis: [],
      unity: [],
      overallScore: 0
    };
  }

  readFile(fileName) {
    const filePath = path.join(__dirname, fileName);
    return fs.readFileSync(filePath, 'utf8');
  }

  analyzeSymmetricalBalance() {
    console.log('⚖️  Analyzing Symmetrical Balance...');
    
    const htmlContent = this.readFile('index.html');
    const cssContent = this.readFile('styles.css');
    
    // Test centered navigation
    const centeredNav = htmlContent.includes('transform: translateX(-50%)') || 
                       cssContent.includes('transform: translateX(-50%)');
    
    // Test centered section headers
    const centeredHeaders = cssContent.includes('text-align: center');
    
    // Test centered contact section
    const centeredContact = htmlContent.includes('contact-content') && 
                           cssContent.includes('text-align: center');
    
    this.results.symmetricalBalance = [
      { element: 'Navigation', centered: centeredNav, description: 'Navigation is horizontally centered' },
      { element: 'Section Headers', centered: centeredHeaders, description: 'Section titles are centered for balance' },
      { element: 'Contact Section', centered: centeredContact, description: 'Contact section uses symmetrical layout' }
    ];
  }

  analyzeAsymmetricalBalance() {
    console.log('🎋 Analyzing Asymmetrical Balance (Zen Principle)...');
    
    const htmlContent = this.readFile('index.html');
    const cssContent = this.readFile('styles.css');
    
    // Test golden ratio usage
    const goldenRatio = cssContent.includes('1.618fr') || cssContent.includes('golden-');
    
    // Test asymmetrical zen elements positioning
    const asymmetricalElements = [
      'top: 10%; left: 70%',
      'top: 60%; left: 15%',
      'top: 30%; left: 80%',
      'top: 20%; left: 25%'
    ];
    
    const hasAsymmetricalPositioning = asymmetricalElements.some(pos => 
      htmlContent.includes(pos)
    );
    
    // Test varied zen element sizes
    const variedSizes = cssContent.includes('.enso-circle.large') && 
                       cssContent.includes('.enso-circle.medium') && 
                       cssContent.includes('.enso-circle.small');
    
    // Test organic positioning (not grid-based)
    const organicPositioning = cssContent.includes('position: absolute') && 
                              htmlContent.includes('style="top:') && 
                              htmlContent.includes('left:');
    
    this.results.asymmetricalBalance = [
      { principle: 'Golden Ratio Layout', present: goldenRatio, description: 'Uses 1.618 proportions for natural balance' },
      { principle: 'Asymmetrical Positioning', present: hasAsymmetricalPositioning, description: 'Zen elements positioned asymmetrically' },
      { principle: 'Varied Element Sizes', present: variedSizes, description: 'Different sizes create visual weight balance' },
      { principle: 'Organic Positioning', present: organicPositioning, description: 'Natural, non-grid positioning' }
    ];
  }

  analyzeVisualHierarchy() {
    console.log('📊 Analyzing Visual Hierarchy...');
    
    const cssContent = this.readFile('styles.css');
    
    // Test typography scale
    const hasTypographyScale = cssContent.includes('--font-size-4xl') && 
                              cssContent.includes('--font-size-3xl') && 
                              cssContent.includes('--font-size-2xl');
    
    // Test color hierarchy
    const hasColorHierarchy = cssContent.includes('--color-sumi') && 
                             cssContent.includes('--color-nezumi') && 
                             cssContent.includes('--color-usuzumi');
    
    // Test spacing hierarchy
    const hasSpacingScale = cssContent.includes('--space-xs') && 
                           cssContent.includes('--space-sm') && 
                           cssContent.includes('--space-md') && 
                           cssContent.includes('--space-lg');
    
    // Test font weight hierarchy
    const hasFontWeights = cssContent.includes('font-weight: 600') && 
                          cssContent.includes('font-weight: 500') && 
                          cssContent.includes('font-weight: 400') && 
                          cssContent.includes('font-weight: 300');
    
    // Test z-index layering
    const hasLayering = cssContent.includes('z-index: 100') && 
                       cssContent.includes('z-index: 10') && 
                       cssContent.includes('z-index: 1') && 
                       cssContent.includes('z-index: -1');
    
    this.results.visualHierarchy = [
      { aspect: 'Typography Scale', implemented: hasTypographyScale, description: 'Clear size hierarchy for readability' },
      { aspect: 'Color Hierarchy', implemented: hasColorHierarchy, description: 'Color intensity guides attention' },
      { aspect: 'Spacing Scale', implemented: hasSpacingScale, description: 'Consistent spacing system' },
      { aspect: 'Font Weight Hierarchy', implemented: hasFontWeights, description: 'Weight variation for emphasis' },
      { aspect: 'Z-Index Layering', implemented: hasLayering, description: 'Proper content layering' }
    ];
  }

  analyzeProportions() {
    console.log('📐 Analyzing Proportions...');
    
    const cssContent = this.readFile('styles.css');
    
    // Test golden ratio implementation
    const goldenRatioGrid = cssContent.includes('1.618fr 1fr');
    
    // Test container proportions
    const containerWidth = cssContent.includes('min(70vw, 1000px)') || 
                          cssContent.includes('min(61.8vw');
    
    // Test responsive scaling
    const responsiveScaling = cssContent.includes('clamp(') && 
                             cssContent.includes('vw');
    
    // Test aspect ratios
    const maintainsAspectRatio = cssContent.includes('aspect-ratio') || 
                                cssContent.includes('padding-bottom:');
    
    // Test modular scale
    const modularScale = cssContent.includes('1.125') || 
                        cssContent.includes('1.25') || 
                        cssContent.includes('1.5');
    
    this.results.proportions = [
      { measure: 'Golden Ratio Grid', applied: goldenRatioGrid, description: '1.618:1 ratio for natural harmony' },
      { measure: 'Container Proportions', applied: containerWidth, description: 'Optimal reading width (70vw max)' },
      { measure: 'Responsive Scaling', applied: responsiveScaling, description: 'Fluid typography and spacing' },
      { measure: 'Aspect Ratios', applied: maintainsAspectRatio, description: 'Consistent proportional relationships' },
      { measure: 'Modular Scale', applied: modularScale, description: 'Mathematical progression in sizes' }
    ];
  }

  analyzeRhythm() {
    console.log('🌊 Analyzing Visual Rhythm...');
    
    const cssContent = this.readFile('styles.css');
    const htmlContent = this.readFile('index.html');
    
    // Test repeated patterns
    const repeatedZenElements = htmlContent.includes('.zen-pebble') && 
                               htmlContent.includes('.enso-circle') && 
                               htmlContent.includes('.bamboo-node');
    
    // Test consistent spacing
    const consistentSpacing = cssContent.includes('var(--space-') && 
                             cssContent.includes('margin:') && 
                             cssContent.includes('padding:');
    
    // Test animation rhythm
    const animationRhythm = cssContent.includes('@keyframes') && 
                           cssContent.includes('ease-in-out') && 
                           cssContent.includes('infinite');
    
    // Test grid rhythm
    const gridRhythm = cssContent.includes('grid-template-columns') && 
                      cssContent.includes('gap:');
    
    // Test breathing space
    const breathingSpace = cssContent.includes('zen-breathing') && 
                          cssContent.includes('breathingRhythm');
    
    this.results.rhythm = [
      { pattern: 'Repeated Zen Elements', present: repeatedZenElements, description: 'Consistent zen element patterns' },
      { pattern: 'Consistent Spacing', present: consistentSpacing, description: 'Systematic spacing variables' },
      { pattern: 'Animation Rhythm', present: animationRhythm, description: 'Harmonious animation timing' },
      { pattern: 'Grid Rhythm', present: gridRhythm, description: 'Regular grid patterns' },
      { pattern: 'Breathing Space', present: breathingSpace, description: 'Meditation-inspired pacing' }
    ];
  }

  analyzeEmphasis() {
    console.log('🎯 Analyzing Emphasis and Focal Points...');
    
    const cssContent = this.readFile('styles.css');
    const htmlContent = this.readFile('index.html');
    
    // Test hero emphasis
    const heroEmphasis = cssContent.includes('.hero-title') && 
                        cssContent.includes('font-size: var(--font-size-4xl)');
    
    // Test color emphasis
    const colorEmphasis = cssContent.includes('--color-kohaku') && 
                         htmlContent.includes('AMD Award Winner');
    
    // Test size emphasis
    const sizeEmphasis = cssContent.includes('.project-badge') && 
                        cssContent.includes('transform: scale');
    
    // Test position emphasis
    const positionEmphasis = cssContent.includes('z-index: 100') && 
                            cssContent.includes('position: fixed');
    
    // Test contrast emphasis
    const contrastEmphasis = cssContent.includes('color: var(--color-sumi)') && 
                            cssContent.includes('background: var(--color-washi)');
    
    this.results.emphasis = [
      { method: 'Hero Typography', effective: heroEmphasis, description: 'Large, prominent hero title' },
      { method: 'Color Accent', effective: colorEmphasis, description: 'Strategic use of kohaku amber' },
      { method: 'Size Scaling', effective: sizeEmphasis, description: 'Hover effects for emphasis' },
      { method: 'Position Priority', effective: positionEmphasis, description: 'Fixed navigation for importance' },
      { method: 'Contrast', effective: contrastEmphasis, description: 'High contrast for readability' }
    ];
  }

  analyzeUnity() {
    console.log('🤝 Analyzing Unity and Cohesion...');
    
    const cssContent = this.readFile('styles.css');
    
    // Test consistent color palette
    const colorPalette = cssContent.includes('--color-sumi') && 
                        cssContent.includes('--color-washi') && 
                        cssContent.includes('--color-kohaku') && 
                        cssContent.includes('--color-sabizome');
    
    // Test typography consistency
    const typographyUnity = cssContent.includes('--font-primary') && 
                           cssContent.includes('--font-accent') && 
                           cssContent.includes('font-family: var(--font-');
    
    // Test spacing consistency
    const spacingUnity = cssContent.includes('--space-') && 
                        cssContent.includes('var(--space-');
    
    // Test zen theme consistency
    const zenTheme = cssContent.includes('.zen-') && 
                    cssContent.includes('.bamboo-') && 
                    cssContent.includes('.enso-');
    
    // Test animation consistency
    const animationUnity = cssContent.includes('var(--transition-') && 
                          cssContent.includes('cubic-bezier');
    
    this.results.unity = [
      { element: 'Color Palette Unity', consistent: colorPalette, description: 'Cohesive Japanese color scheme' },
      { element: 'Typography Unity', consistent: typographyUnity, description: 'Consistent font system' },
      { element: 'Spacing Unity', consistent: spacingUnity, description: 'Systematic spacing variables' },
      { element: 'Zen Theme Unity', consistent: zenTheme, description: 'Consistent zen design language' },
      { element: 'Animation Unity', consistent: animationUnity, description: 'Harmonious transition system' }
    ];
  }

  calculateOverallScore() {
    const allTests = [
      ...this.results.symmetricalBalance.map(t => t.centered),
      ...this.results.asymmetricalBalance.map(t => t.present),
      ...this.results.visualHierarchy.map(t => t.implemented),
      ...this.results.proportions.map(t => t.applied),
      ...this.results.rhythm.map(t => t.present),
      ...this.results.emphasis.map(t => t.effective),
      ...this.results.unity.map(t => t.consistent)
    ];
    
    const passed = allTests.filter(test => test).length;
    this.results.overallScore = Math.round((passed / allTests.length) * 100);
  }

  generateReport() {
    console.log('\n📊 VISUAL BALANCE ANALYSIS REPORT');
    console.log('===================================\n');
    
    // Symmetrical Balance
    console.log('⚖️  SYMMETRICAL BALANCE:');
    this.results.symmetricalBalance.forEach(test => {
      const status = test.centered ? '✅' : '❌';
      console.log(`  ${status} ${test.element}: ${test.description}`);
    });
    
    // Asymmetrical Balance
    console.log('\n🎋 ASYMMETRICAL BALANCE (ZEN):');
    this.results.asymmetricalBalance.forEach(test => {
      const status = test.present ? '✅' : '❌';
      console.log(`  ${status} ${test.principle}: ${test.description}`);
    });
    
    // Visual Hierarchy
    console.log('\n📊 VISUAL HIERARCHY:');
    this.results.visualHierarchy.forEach(test => {
      const status = test.implemented ? '✅' : '❌';
      console.log(`  ${status} ${test.aspect}: ${test.description}`);
    });
    
    // Proportions
    console.log('\n📐 PROPORTIONS:');
    this.results.proportions.forEach(test => {
      const status = test.applied ? '✅' : '❌';
      console.log(`  ${status} ${test.measure}: ${test.description}`);
    });
    
    // Rhythm
    console.log('\n🌊 VISUAL RHYTHM:');
    this.results.rhythm.forEach(test => {
      const status = test.present ? '✅' : '❌';
      console.log(`  ${status} ${test.pattern}: ${test.description}`);
    });
    
    // Emphasis
    console.log('\n🎯 EMPHASIS:');
    this.results.emphasis.forEach(test => {
      const status = test.effective ? '✅' : '❌';
      console.log(`  ${status} ${test.method}: ${test.description}`);
    });
    
    // Unity
    console.log('\n🤝 UNITY & COHESION:');
    this.results.unity.forEach(test => {
      const status = test.consistent ? '✅' : '❌';
      console.log(`  ${status} ${test.element}: ${test.description}`);
    });
    
    // Overall Assessment
    console.log(`\n🏆 OVERALL VISUAL BALANCE SCORE: ${this.results.overallScore}%`);
    
    if (this.results.overallScore >= 95) {
      console.log('🎋 EXCEPTIONAL: Perfect visual balance with professional zen aesthetics');
      console.log('   Your portfolio demonstrates mastery of design principles');
    } else if (this.results.overallScore >= 85) {
      console.log('🌸 EXCELLENT: Strong visual balance with minor refinements possible');
    } else if (this.results.overallScore >= 75) {
      console.log('🍃 GOOD: Solid visual balance foundation');
    } else {
      console.log('🌱 NEEDS IMPROVEMENT: Visual balance requires attention');
    }
    
    console.log('\n📋 DESIGN PRINCIPLES SUMMARY:');
    console.log('  • Symmetrical elements provide stability and professionalism');
    console.log('  • Asymmetrical zen elements create dynamic, natural balance');
    console.log('  • Clear visual hierarchy guides user attention effectively');
    console.log('  • Golden ratio proportions create harmonious relationships');
    console.log('  • Consistent rhythm establishes visual flow and unity');
    console.log('  • Strategic emphasis highlights key information');
    console.log('  • Unified design language creates cohesive experience');
    
    console.log('\n===================================');
  }

  run() {
    console.log('🎨 Starting Visual Balance Analysis...\n');
    
    try {
      this.analyzeSymmetricalBalance();
      this.analyzeAsymmetricalBalance();
      this.analyzeVisualHierarchy();
      this.analyzeProportions();
      this.analyzeRhythm();
      this.analyzeEmphasis();
      this.analyzeUnity();
      this.calculateOverallScore();
      this.generateReport();
    } catch (error) {
      console.error('❌ Error running visual balance analysis:', error.message);
    }
  }
}

// Run the analyzer
const analyzer = new VisualBalanceAnalyzer();
analyzer.run();