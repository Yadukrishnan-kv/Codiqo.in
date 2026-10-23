import Founder from '../models/Founder.js'
import { createSingletonController } from '../utils/createSingletonController.js'

const DEFAULTS = {
  name: 'Yadu Krishnan K.V.',
  initials: 'YK.',
  establishedLabel: 'Est. 2024',
  bioParagraph1:
    "I'm Yadu Krishnan, a web developer and the mind behind Codiqo. I build digital products focused on performance, usability, and real-world impact.",
  bioParagraph2:
    'I help founders and businesses ship websites, web applications, and mobile apps — experiences focused on performance, usability, and long-term growth. Every project is engineered for speed, accessibility, and measurable results.',
  highlight1Icon: 'CodeXml',
  highlight1Label: 'Builds',
  highlight1Value: 'Static · Dynamic · Custom',
  highlight2Icon: 'Globe',
  highlight2Label: 'Working',
  highlight2Value: 'Worldwide',
  highlight3Icon: 'Compass',
  highlight3Label: 'Approach',
  highlight3Value: 'Design. Build. Scale.',
  primaryCtaLabel: "Let's Get Started",
  primaryCtaHref: '#contact',
  secondaryCtaLabel: 'Explore Work',
  secondaryCtaHref: '#work',
  photoUrl: '',
}

export default createSingletonController(Founder, DEFAULTS)
