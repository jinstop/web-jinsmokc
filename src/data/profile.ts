/**
 * Company data.
 * Content is separated from presentation: edit copy here, leave components alone.
 */

export const STATS = [
  { value: 950, suffix: '°C', label: 'Max operating temperature', hint: 'Standard configuration' },
  { value: '±5', suffix: '°C', label: 'Work zone uniformity', hint: 'Documented on request' },
  { value: 40, suffix: '+', label: 'Export markets', hint: 'Europe, North America, Southeast Asia' },
  { value: 25, suffix: ' yrs', label: 'Engineering & manufacturing', hint: 'Continuous furnace lines only' },
] as const;

export const ABOUT_PARAGRAPHS = [
  'HCS builds continuous heat treatment furnaces for industrial component manufacturers. We work on one product family: furnaces that process parts continuously through a controlled thermal cycle, rather than in batches.',
  'That focus shapes how we work. A continuous line is a system — heating, atmosphere, conveying, quench and control all interact. A furnace that meets its stated temperature on paper but drifts across the work zone in production is not a usable furnace, so we treat uniformity verification and handover documentation as part of the machine, not as paperwork.',
  'We supply mesh belt, roller hearth, car bottom and pusher platforms, and we size each line against the customer\'s actual part geometry, throughput target and downstream handling. Sometimes that means recommending a smaller line with a longer dwell, or a two-stage arrangement, instead of the biggest furnace the budget would allow.',
  'Export is where most of our work sits. That means remote commissioning support, operator training, and spare parts that can be shipped quickly enough to matter.',
] as const;

export const TIMELINE = [
  {
    period: '1998',
    title: 'Company founded',
    body: 'Started as a furnace component fabricator, building burners, retorts and frames for batch furnace builders.',
  },
  {
    period: '2004',
    title: 'First continuous mesh belt line',
    body: 'Delivered the first in-house designed continuous mesh belt furnace for fastener and small parts hardening.',
  },
  {
    period: '2009',
    title: 'Roller hearth development',
    body: 'Roller hearth platform introduced for larger parts and heavier loads where a mesh belt would not carry the weight.',
  },
  {
    period: '2014',
    title: 'First export installations',
    body: 'Commissioned lines in Europe and Southeast Asia; remote commissioning workflow established.',
  },
  {
    period: '2019',
    title: 'Full platform range',
    body: 'Car bottom and pusher types added, completing the four continuous platforms offered today.',
  },
  {
    period: 'Present',
    title: '40+ export markets',
    body: 'Lines in service across Europe, North America, Turkey, India and Southeast Asia.',
  },
] as const;

export const SKILLS = [
  {
    no: '01',
    title: 'Continuous Mesh Belt Furnace',
    tags: ['Mesh belt', 'Fasteners', 'Small parts', 'High throughput'],
    body: 'Parts carried on a woven mesh belt through the full thermal cycle. Suits small to medium components that need high throughput and can tolerate belt contact.',
    points: [
      'Belt width and pitch matched to part size',
      'Continuous or batch loading with zone control',
      'Optional quench section at the belt exit',
    ],
  },
  {
    no: '02',
    title: 'Roller Hearth Furnace',
    tags: ['Roller hearth', 'Heavy parts', 'Shafts', 'Rings'],
    body: 'Parts ride on driven rollers through the heated zone. Built for heavier sections and long parts that a mesh belt cannot support.',
    points: [
      'Heated roller table with independent zone control',
      'Suitable for shafts, rings, flanges and forgings',
      'Load and unload tables sized to your handling',
    ],
  },
  {
    no: '03',
    title: 'Car Bottom Furnace',
    tags: ['Car bottom', 'Car shuttle', 'Large parts', 'Variable batches'],
    body: 'A batch furnace that moves on rail-mounted cars through a continuous tunnel. High chamber flexibility for mixed part families.',
    points: [
      'Multiple cars, staggered cycle times',
      'Sealed atmosphere with controlled purge',
      'Good fit where part mix changes frequently',
    ],
  },
  {
    no: '04',
    title: 'Pusher Furnace',
    tags: ['Pusher', 'Long parts', 'Bars', 'Continuous discharge'],
    body: 'Work is pushed continuously from a charge end through the heated length, with a discharge conveyor at the far end.',
    points: [
      'Simple, rugged mechanism with few moving parts',
      'Suits long bars and linear parts',
      'Easy to integrate with upstream and downstream handling',
    ],
  },
] as const;

export const SERVICES = [
  {
    no: '01',
    title: 'Process Engineering',
    summary: 'Size the line against your parts, not our catalogue.',
    body: 'We start from your part geometry, throughput target, atmosphere requirement and downstream handling, then size heating zones, dwell and conveying accordingly. The output is a specification you can send to other suppliers for comparison.',
    deliverables: ['Process recommendation', 'Zone and temperature layout', 'Throughput and energy estimate'],
  },
  {
    no: '02',
    title: 'Manufacturing & Inspection',
    summary: 'Fabrication with documented checks at each stage.',
    body: 'In-house fabrication of frames, retorts and conveyor assemblies. Inspection points cover refractory lining, element and burner installation, sealing and control wiring, recorded against the agreed specification.',
    deliverables: ['Fabrication progress reports', 'Inspection and test records', 'Pre-shipment FAT report'],
  },
  {
    no: '03',
    title: 'Installation & Commissioning',
    summary: 'On-site or remote, with operator handover.',
    body: 'Foundation and erection supervision, burn-in, atmosphere tuning, uniformity survey and operator training. For distant markets we run supervised remote commissioning with video support.',
    deliverables: ['Installation supervision', 'Temperature uniformity survey', 'Operator training records'],
  },
  {
    no: '04',
    title: 'Aftermarket & Spare Parts',
    summary: 'Support that continues after handover.',
    body: 'Wear parts, heating elements, burners, belt and roller stock are held or manufactured to order. Remote troubleshooting first to see whether a visit is needed.',
    deliverables: ['Spare parts list at handover', 'Remote troubleshooting support', 'Wear part replacement guidance'],
  },
] as const;

export const PROCESS = [
  {
    step: '01',
    title: 'Enquiry & Process Definition',
    body: 'You send part samples or drawings, throughput target and atmosphere requirement. We confirm what the process actually needs before quoting equipment.',
  },
  {
    step: '02',
    title: 'Engineering & Quotation',
    body: 'We issue a technical proposal with zone layout, temperature range, uniformity class and utilities consumption, plus a price and lead time you can compare like for like.',
  },
  {
    step: '03',
    title: 'Manufacturing & Pre-Shipment Test',
    body: 'Fabrication and assembly proceed with recorded inspection points. A pre-shipment test is run so issues surface at our works, not at your plant.',
  },
  {
    step: '04',
    title: 'Delivery, Commissioning & Training',
    body: 'Erection, burn-in, atmosphere tuning and uniformity survey, then operator handover. Documentation and spare parts go with the machine.',
  },
] as const;

export const PRINCIPLES = [
  { title: 'Process first, catalogue second', body: 'Equipment is sized against your part and throughput, not against what we would like to sell.' },
  { title: 'Uniformity you can verify', body: 'Work zone uniformity is surveyed and documented rather than asserted in a brochure.' },
  { title: 'Delivered as specified', body: 'Test records and documents are issued against the agreed specification at handover.' },
  { title: 'Support after handover', body: 'Commissioning, training and spare parts continue long after the invoice is closed.' },
] as const;
