import Hero from '../models/Hero.js'
import { createSingletonController } from '../utils/createSingletonController.js'

const DEFAULTS = {
  badgeText: 'Building digital products that perform',
  headingLine1: 'We craft',
  headingLine2: 'websites that',
  headingLine3: 'drive growth',
  paragraph:
    'Codiqo is a web development studio designing static, dynamic, and fully custom websites built to engage visitors, generate leads, and grow your brand.',
  primaryCtaLabel: "Let's Get Started",
  primaryCtaHref: '#contact',
  secondaryCtaLabel: 'Explore Work',
  secondaryCtaHref: '#work',
  widgetTopLeft: 'Static Websites',
  widgetBottomLeft: 'Dynamic Web Apps',
  widgetTopRight: 'Custom Solutions',
  widgetBottomRight: 'Mobile Applications',
}

export default createSingletonController(Hero, DEFAULTS)
