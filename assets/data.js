/* formé collection data. Edit objects, designers and stories here. */
/* ---------- Data ---------- */
  var DEPTS = [
    { id: 'lighting', label: 'Lighting', lede: 'The lamps that shaped design history, each with the story of how it came to be.',
      about: 'A lamp becomes a design icon when it solves a problem of light in a way nobody had tried before, and keeps doing it for decades. The lamps here come from different countries and decades, but they share that clarity. Some are still produced by their original makers, others survive only as vintage pieces.',
      types: ['Pendant', 'Table', 'Desk', 'Floor', 'Wall', 'Ceiling'] },
    { id: 'furniture', label: 'Furniture', lede: 'Chairs, tables and stools that changed how we sit, live and build.',
      about: 'Many of the most important pieces of modern furniture were experiments with a new material: tubular steel, moulded plywood, fibreglass, plastic. Each one shows a designer pushing a technique until it became a form. Most are still made today, often by the same companies that first produced them.',
      types: ['Chair', 'Lounge', 'Table', 'Stool', 'Bench', 'Sofa', 'Storage', 'Desk'] },
    { id: 'objects', label: 'Objects', lede: 'Small things with big ideas: vases, clocks and tools for everyday life.',
      about: 'Design classics are not only chairs and lamps. Some of the most recognisable objects of the twentieth century are small enough to hold in one hand, and they carry the same ideas about material, form and use.',
      types: ['Vase', 'Clock', 'Kitchen', 'Candleholder', 'Wall'] }
  ];

  var DESIGNERS = [
    { id: 'alvar-aalto', name: 'Alvar Aalto', sort: 'Aalto', short: 'Aalto', country: 'Finland', years: '1898–1976', nationality: 'Finnish', knownFor: 'Bent plywood, organic forms', collaborators: 'Artek, Iittala',
      inShort: 'Finnish architect and designer who brought warmth and natural curves to modernism. His bent plywood furniture and wave-shaped glass are still produced today.',
      bio: ['Alvar Aalto designed buildings, furniture and glass as parts of one whole. Many of his best-known pieces were made for a specific building, such as the Paimio Sanatorium.', 'Together with his wife Aino Aalto and partners he founded Artek in 1935 to produce and sell his furniture.'] },
    { id: 'gae-aulenti', name: 'Gae Aulenti', sort: 'Aulenti', short: 'Aulenti', country: 'Italy' },
    { id: 'marcel-breuer', name: 'Marcel Breuer', sort: 'Breuer', short: 'Breuer', country: 'Germany · USA' },
    { id: 'george-carwardine', name: 'George Carwardine', sort: 'Carwardine', short: 'Carwardine', country: 'United Kingdom' },
    { id: 'castiglioni', name: 'Achille & Pier Giacomo Castiglioni', sort: 'Castiglioni', short: 'Castiglioni', country: 'Italy', years: '1918–2002 · 1913–1968', nationality: 'Italian', knownFor: 'Lighting, ready-made ideas', collaborators: 'Flos',
      inShort: 'Two brothers from Milan who designed some of the most inventive lamps of the twentieth century, often by borrowing parts and ideas from everyday objects.',
      bio: ['Achille and Pier Giacomo Castiglioni worked together from the 1940s until Pier Giacomo’s death in 1968. Achille continued designing for decades afterwards.', 'Their lamps for Flos, such as Arco and Taccia, combine humour with careful engineering. They often started from a practical problem and a found object.'] },
    { id: 'michele-de-lucchi', name: 'Michele De Lucchi & Giancarlo Fassina', sort: 'De Lucchi', short: 'De Lucchi', country: 'Italy' },
    { id: 'charles-and-ray-eames', name: 'Charles & Ray Eames', sort: 'Eames', short: 'Eames', country: 'USA', years: '1907–1978 · 1912–1988', nationality: 'American', knownFor: 'Moulded plywood, plastic and wire furniture', collaborators: 'Herman Miller, Vitra',
      inShort: 'An American couple whose office in Los Angeles designed furniture, films, exhibitions and toys. They made modern design feel friendly and useful.',
      bio: ['Charles and Ray Eames experimented with moulding plywood during the 1940s, and the technique shaped much of their furniture.', 'Their work was produced by Herman Miller in America and later by Vitra in Europe. Alongside furniture they made short films, exhibitions and objects for the home.'] },
    { id: 'poul-henningsen', name: 'Poul Henningsen', sort: 'Henningsen', short: 'Henningsen', country: 'Denmark', years: '1894–1967', nationality: 'Danish', knownFor: 'Glare-free lighting', collaborators: 'Louis Poulsen',
      inShort: 'Danish architect, writer and critic, best known for his glare-free PH lamps made with Louis Poulsen. His lifelong subject was how electric light could feel calm instead of harsh.',
      bio: ['Poul Henningsen trained as an architect but never limited himself to buildings. He wrote, edited and argued about culture, politics and design, and he approached lighting with the same critical eye.', 'From the mid-1920s he worked with Louis Poulsen on a family of multi-shade lamps. The principle stayed the same for decades: hide the bulb, guide the light, avoid glare.'] },
    { id: 'arne-jacobsen', name: 'Arne Jacobsen', sort: 'Jacobsen', short: 'Jacobsen', country: 'Denmark', years: '1902–1971', nationality: 'Danish', knownFor: 'Architecture and furniture as one', collaborators: 'Fritz Hansen',
      inShort: 'Danish architect who designed buildings down to their door handles. Several of his chairs were made for his own buildings and became classics on their own.',
      bio: ['Arne Jacobsen treated a building and its furniture as one project. For the SAS Royal Hotel in Copenhagen he designed the architecture, the furniture, the lamps and even the cutlery.', 'His chairs for Fritz Hansen, such as the Series 7 and the Egg, are among the most produced designs of Danish modernism.'] },
    { id: 'mogens-lassen', name: 'Mogens Lassen', sort: 'Lassen', short: 'Lassen', country: 'Denmark' },
    { id: 'le-corbusier', name: 'Le Corbusier, Pierre Jeanneret & Charlotte Perriand', sort: 'Le Corbusier', short: 'Le Corbusier', country: 'France' },
    { id: 'vico-magistretti', name: 'Vico Magistretti', sort: 'Magistretti', short: 'Magistretti', country: 'Italy' },
    { id: 'mies-van-der-rohe', name: 'Ludwig Mies van der Rohe & Lilly Reich', sort: 'Mies van der Rohe', short: 'Mies', country: 'Germany' },
    { id: 'george-nelson', name: 'George Nelson Associates', sort: 'Nelson', short: 'Nelson', country: 'USA' },
    { id: 'isamu-noguchi', name: 'Isamu Noguchi', sort: 'Noguchi', short: 'Noguchi', country: 'USA · Japan', years: '1904–1988', nationality: 'American', knownFor: 'Sculpture, gardens, light', collaborators: 'Herman Miller, Ozeki',
      inShort: 'American sculptor with Japanese roots who moved freely between sculpture, gardens, stage design and furniture. His Akari lamps and glass table bring sculpture into the home.',
      bio: ['Isamu Noguchi saw no hard line between art and design. A table, a lamp or a garden could be a sculpture that people also use.', 'His coffee table for Herman Miller and his Akari light sculptures, made in Gifu, are still produced today.'] },
    { id: 'verner-panton', name: 'Verner Panton', sort: 'Panton', short: 'Panton', country: 'Denmark', years: '1926–1998', nationality: 'Danish', knownFor: 'Colour, plastic, total interiors', collaborators: 'Vitra, Louis Poulsen',
      inShort: 'Danish designer known for bold colours, soft shapes and complete interiors. He explored what new materials like plastic could do for furniture and light.',
      bio: ['Verner Panton trained as an architect and worked briefly with Arne Jacobsen before starting his own practice.', 'He designed entire rooms in which walls, furniture and lighting flowed together. His Panton Chair and Panthella lamp are the best-known pieces from that world.'] },
    { id: 'eero-saarinen', name: 'Eero Saarinen', sort: 'Saarinen', short: 'Saarinen', country: 'USA' },
    { id: 'richard-sapper', name: 'Richard Sapper', sort: 'Sapper', short: 'Sapper', country: 'Germany' },
    { id: 'philippe-starck', name: 'Philippe Starck', sort: 'Starck', short: 'Starck', country: 'France' },
    { id: 'michael-thonet', name: 'Michael Thonet', sort: 'Thonet', short: 'Thonet', country: 'Austria' },
    { id: 'hans-j-wegner', name: 'Hans J. Wegner', sort: 'Wegner', short: 'Wegner', country: 'Denmark' },
    { id: 'sori-yanagi', name: 'Sori Yanagi', sort: 'Yanagi', short: 'Yanagi', country: 'Japan' }
  ];
  var dById = {}; DESIGNERS.forEach(function (d) { dById[d.id] = d; });

  /* o(dept, slug, name, designer, year, yearLabel, type, materialTags, materials, origin, status, manufacturer, added, art, inShort, story, extra) */
  function O(a) { return a; }
  var OBJECTS = [
    /* Lighting */
    O({ dept: 'lighting', slug: 'anglepoise-1227', name: 'Anglepoise 1227', designer: 'george-carwardine', year: 1935, type: 'Desk', material: ['Metal'], materials: 'Steel, springs', origin: 'United Kingdom', status: 'In production', manufacturer: 'Anglepoise', added: 4, art: 'anglepoise',
      inShort: 'A desk lamp by British engineer George Carwardine, released in 1935 for the home. Springs balance its arms, so the lamp holds any position without being clamped.',
      story: [['An engineer’s lamp', 'Carwardine specialised in vehicle suspension. He applied what he knew about springs to a jointed arm that could move freely and stay put.'], ['From workshop to home', 'The first versions were made for workshops and offices. The 1227, with four springs, was designed for domestic use and became the model for countless task lamps.']] }),
    O({ dept: 'lighting', slug: 'akari-1a', name: 'Akari 1A', designer: 'isamu-noguchi', year: 1951, type: 'Table', material: ['Paper', 'Wood'], materials: 'Washi paper, bamboo', origin: 'Japan', status: 'In production', manufacturer: 'Ozeki & Co.', added: 8, art: 'akari',
      inShort: 'A table lamp by Isamu Noguchi from 1951. Its shade is made of washi paper stretched over a bamboo frame, using a craft from Gifu in Japan. Akari is a Japanese word for light.',
      story: [['Lanterns from Gifu', 'In 1951 Noguchi visited Gifu, a town known for paper lanterns. He saw a way to bring that craft into modern homes and began a series that would grow to many designs.'], ['Light as weight', 'The paper softens the bulb into an even glow, and the lamp looks almost weightless. Akari lamps fold flat, which made them easy to ship.']] }),
    O({ dept: 'lighting', slug: 'ph-5', name: 'PH 5', designer: 'poul-henningsen', year: 1958, type: 'Pendant', material: ['Metal'], materials: 'Aluminium', origin: 'Denmark', status: 'In production', manufacturer: 'Louis Poulsen', dimensions: 'Ø 50 cm', added: 30, art: 'ph5',
      inShort: 'A pendant lamp by Danish architect Poul Henningsen, made by Louis Poulsen since 1958. Three stacked shades hide the bulb from every angle and give soft, glare-free light. The name comes from the 50 cm diameter of its top shade.',
      story: [['A problem with light', 'In the 1920s, Poul Henningsen became preoccupied with a simple question: how can electric light feel pleasant instead of harsh? Bare bulbs glared and cast hard shadows. His answer was a system of several shades, developed together with Louis Poulsen.'], ['Three shades, one idea', 'The PH 5 of 1958 takes the principle further. Three stacked shades, shaped after a logarithmic spiral, direct the light downwards and sideways while keeping the source completely hidden.'], ['Still above the table', 'Louis Poulsen still produces the lamp today. In Denmark it hangs over countless dining tables.']] }),
    O({ dept: 'lighting', slug: 'ph-artichoke', name: 'PH Artichoke', designer: 'poul-henningsen', year: 1958, type: 'Pendant', material: ['Metal'], materials: 'Copper, steel', origin: 'Denmark', status: 'In production', manufacturer: 'Louis Poulsen', dimensions: 'Several sizes', added: 9, art: 'artichoke',
      inShort: 'A pendant lamp by Poul Henningsen from 1958, created for the Langelinie Pavilion restaurant in Copenhagen. Rows of overlapping leaves hide the bulb and turn the lamp into a sculpture.',
      story: [['Made for a room', 'Henningsen designed the lamp for a new restaurant pavilion on the Copenhagen waterfront. It had to light a large space without glare and look good from every side.'], ['Leaves instead of shades', 'Instead of a few large shades, the Artichoke uses many small leaves arranged in rows. Each leaf catches and reflects light, so the lamp glows while the bulb stays out of sight.']] }),
    O({ dept: 'lighting', slug: 'arco', name: 'Arco', designer: 'castiglioni', year: 1962, type: 'Floor', material: ['Metal', 'Marble'], materials: 'Marble, stainless steel', origin: 'Italy', status: 'In production', manufacturer: 'Flos', added: 12, art: 'arco',
      inShort: 'A floor lamp by Achille and Pier Giacomo Castiglioni from 1962, made by Flos. A long steel arc rising from a heavy marble base brings overhead light to a table without a ceiling fixture.',
      story: [['Light without a ceiling', 'The brothers wanted the light of a pendant above a dining table, without drilling into the ceiling. The answer was a stand that could reach over the table from the side.'], ['The weight of marble', 'The base is a solid block of marble that balances the long arc. It has a hole through it, so two people can lift it with a broom handle.']] }),
    O({ dept: 'lighting', slug: 'taccia', name: 'Taccia', designer: 'castiglioni', year: 1962, type: 'Table', material: ['Glass', 'Metal'], materials: 'Glass, aluminium', origin: 'Italy', status: 'In production', manufacturer: 'Flos', added: 10, art: 'taccia',
      inShort: 'A table lamp by Achille and Pier Giacomo Castiglioni from 1962, made by Flos. A wide glass bowl rests loosely on a fluted metal base, so the light can be angled by tilting the bowl.',
      story: [['A bowl of light', 'Instead of a shade hanging over the bulb, Taccia gathers its light in an open bowl. Because the bowl is not fixed, it can be tilted to direct the light.'], ['A column with a purpose', 'The fluted base looks like a classical column, but its ribs also help release heat from the lamp.']] }),
    O({ dept: 'lighting', slug: 'pipistrello', name: 'Pipistrello', designer: 'gae-aulenti', year: 1965, type: 'Table', material: ['Metal', 'Plastic'], materials: 'Metal, acrylic', origin: 'Italy', status: 'In production', manufacturer: 'Martinelli Luce', added: 6, art: 'pipistrello',
      inShort: 'A table lamp by Italian architect Gae Aulenti from 1965, made by Martinelli Luce. Its scalloped shade recalls the wings of a bat, which is what pipistrello means in Italian.',
      story: [['A lamp that grows', 'The stem is telescopic, so the lamp can stand low on a side table or rise higher on a desk.'], ['An architect’s object', 'Aulenti worked on buildings, interiors and museums. The Pipistrello carries that sense of scale into a single object.']] }),
    O({ dept: 'lighting', slug: 'murano-globe', name: 'Murano Globe', designer: null, designerLabel: 'Venice', designerFull: 'Unknown maker, Venice', year: 1970, yearLabel: 'c. 1970', type: 'Pendant', material: ['Glass'], materials: 'Murrine glass', origin: 'Italy', status: 'Vintage only', added: 29, art: 'murano',
      inShort: 'An anonymous pendant from Murano, the Venetian island known for glassmaking. Its millefiori pattern is made from thin slices of coloured glass canes, fused into a single globe.',
      story: [['A thousand flowers', 'Millefiori means a thousand flowers. Glassmakers build long canes with a pattern inside, cut them into thin slices and fuse the slices together. Each globe comes out slightly different.'], ['Why it has no name', 'Many lamps like this were made in small workshops and never signed. We show it because it represents a craft, not a single designer.']] }),
    O({ dept: 'lighting', slug: 'panthella', name: 'Panthella', designer: 'verner-panton', year: 1971, type: 'Table', material: ['Plastic'], materials: 'Acrylic', origin: 'Denmark', status: 'In production', manufacturer: 'Louis Poulsen', added: 7, art: 'panthella',
      inShort: 'A table lamp by Verner Panton from 1971, made by Louis Poulsen. A white dome sits on a flared stem, and light falls downwards while the shade itself glows softly.',
      story: [['One soft shape', 'Panton reduced the lamp to two curves: the dome and the trumpet-shaped stem. The lamp reads as one object, without visible joints or hardware.'], ['Danish light, new form', 'Like the PH lamps from the same manufacturer, the Panthella directs light downwards and avoids glare, in the rounded forms of the 1970s.']] }),
    O({ dept: 'lighting', slug: 'tizio', name: 'Tizio', designer: 'richard-sapper', year: 1972, type: 'Desk', material: ['Metal', 'Plastic'], materials: 'Aluminium, ABS', origin: 'Italy', status: 'In production', manufacturer: 'Artemide', added: 5, art: 'tizio',
      inShort: 'A desk lamp by German designer Richard Sapper from 1972, made by Artemide in Italy. Counterweights balance its arms, and the low-voltage current runs through the arms themselves, so there are no visible cables.',
      story: [['Balance instead of springs', 'Tizio moves with a light touch because counterweights balance each arm. Once placed, it stays where you leave it.'], ['No cables', 'The arms carry the current to the small halogen bulb, so the lamp looks like a drawing in black lines.']] }),
    O({ dept: 'lighting', slug: 'atollo', name: 'Atollo', designer: 'vico-magistretti', year: 1977, type: 'Table', material: ['Metal'], materials: 'Lacquered aluminium', origin: 'Italy', status: 'In production', manufacturer: 'Oluce', added: 11, art: 'atollo',
      inShort: 'A table lamp by Vico Magistretti from 1977, made by Oluce. It is built from three pure shapes: a cylinder, a cone and a half sphere that seems to float above them.',
      story: [['Geometry as a lamp', 'Magistretti reduced the table lamp to basic forms. A thin gap between shade and base makes the dome appear to hover.'], ['Light below the dome', 'The bulb sits under the half sphere, so the light spreads over the table while the shade glows at its edge.']] }),
    O({ dept: 'lighting', slug: 'tolomeo', name: 'Tolomeo', designer: 'michele-de-lucchi', year: 1987, type: 'Desk', material: ['Metal'], materials: 'Aluminium', origin: 'Italy', status: 'In production', manufacturer: 'Artemide', added: 3, art: 'tolomeo',
      inShort: 'A desk lamp by Michele De Lucchi and Giancarlo Fassina from 1987, made by Artemide. Its aluminium arms are balanced by springs and cords that stay visible, like the rigging of a crane.',
      story: [['Showing the mechanics', 'Instead of hiding how the lamp works, Tolomeo puts its balancing system on display. The tension cords and springs become part of its look.'], ['A family of lamps', 'The original desk lamp grew into many versions, from wall lamps to floor lamps, all built on the same arm.']] }),

    /* Furniture */
    O({ dept: 'furniture', slug: 'thonet-no-14', name: 'No. 14', designer: 'michael-thonet', year: 1859, type: 'Chair', material: ['Wood'], materials: 'Bent beech, cane', origin: 'Austria', status: 'In production', manufacturer: 'Thonet', added: 13, art: 'thonet',
      inShort: 'A bentwood chair by Michael Thonet from 1859, often called the coffee house chair. It is made from a few pieces of steam-bent beech and was one of the first chairs produced in large numbers.',
      story: [['Bending instead of carving', 'Thonet developed a way to bend solid beech with steam. Curved parts replaced carved joints, which made the chair light, strong and quick to make.'], ['A chair in a box', 'The chair was sold in parts and assembled on arrival, so many chairs fit into one crate. It became a fixture of cafés across Europe.']] }),
    O({ dept: 'furniture', slug: 'wassily-chair', name: 'Wassily Chair', designer: 'marcel-breuer', year: 1925, type: 'Lounge', material: ['Metal', 'Leather'], materials: 'Chromed steel, leather', origin: 'Germany', status: 'In production', manufacturer: 'Knoll', added: 20, art: 'wassily',
      inShort: 'A lounge chair by Marcel Breuer from 1925, designed while he taught at the Bauhaus. Bent steel tubes form the frame, and taut strips of leather or fabric form the seat, back and arms.',
      story: [['Inspired by a bicycle', 'Breuer was impressed by the bent tubular steel of bicycle handlebars and wondered whether furniture could be built the same way.'], ['A name added later', 'The chair took its name years later from the painter Wassily Kandinsky, a fellow Bauhaus teacher who had one in his home.']] }),
    O({ dept: 'furniture', slug: 'lc4', name: 'LC4 Chaise Longue', designer: 'le-corbusier', year: 1928, type: 'Lounge', material: ['Metal', 'Leather'], materials: 'Steel, leather or hide', origin: 'France', status: 'In production', manufacturer: 'Cassina', added: 14, art: 'lc4',
      inShort: 'A chaise longue by Le Corbusier, Pierre Jeanneret and Charlotte Perriand from 1928, made by Cassina since 1965. The curved steel cradle rests on a separate base and can be set at any angle.',
      story: [['A machine for resting', 'The designers described their furniture as equipment for living. The LC4 follows the body from head to feet and can be tilted from sitting to lying.'], ['Shared authorship', 'For a long time the chair was credited to Le Corbusier alone. Today Charlotte Perriand and Pierre Jeanneret are named as co-designers.']] }),
    O({ dept: 'furniture', slug: 'barcelona-chair', name: 'Barcelona Chair', designer: 'mies-van-der-rohe', year: 1929, type: 'Lounge', material: ['Metal', 'Leather'], materials: 'Steel, leather', origin: 'Germany', status: 'In production', manufacturer: 'Knoll', added: 19, art: 'barcelona',
      inShort: 'A lounge chair by Ludwig Mies van der Rohe and Lilly Reich, designed for the German Pavilion at the 1929 International Exposition in Barcelona. Crossed steel legs carry two leather cushions.',
      story: [['Made for a pavilion', 'The chair was part of a building that had almost no function except to represent a country. It needed to feel formal, calm and modern.'], ['A simple cross', 'From the side the frame forms an X. The tufted leather cushions sit on straps between the curved steel bars.']] }),
    O({ dept: 'furniture', slug: 'paimio-chair', name: 'Paimio Chair', designer: 'alvar-aalto', year: 1932, type: 'Lounge', material: ['Wood'], materials: 'Birch plywood, laminated birch', origin: 'Finland', status: 'In production', manufacturer: 'Artek', added: 15, art: 'paimio',
      inShort: 'A lounge chair by Alvar Aalto from 1932, designed for the Paimio tuberculosis sanatorium in Finland. A single sheet of plywood curls into seat and back, held by two loops of laminated birch.',
      story: [['Designed for patients', 'Aalto designed the whole sanatorium, from the building to the furniture. The angle of the chair was meant to help patients rest and breathe easily.'], ['Warmer than steel', 'Aalto preferred wood to the tubular steel popular at the time. Bent birch gave him curves without the cold touch of metal.']] }),
    O({ dept: 'furniture', slug: 'noguchi-table', name: 'Noguchi Table', designer: 'isamu-noguchi', year: 1944, type: 'Table', material: ['Glass', 'Wood'], materials: 'Glass, solid wood', origin: 'USA', status: 'In production', manufacturer: 'Herman Miller', added: 18, art: 'noguchitable',
      inShort: 'A coffee table by Isamu Noguchi from 1944, produced by Herman Miller since 1947. A heavy glass top rests on two identical wooden pieces that interlock to form the base.',
      story: [['A sculpture to use', 'Noguchi was a sculptor first. The base is a small sculpture of two curved forms that hold each other in balance.'], ['Seen through glass', 'The thick glass top makes the base visible from above, so the table shows its structure from every side.']] }),
    O({ dept: 'furniture', slug: 'wishbone-chair', name: 'Wishbone Chair', designer: 'hans-j-wegner', year: 1949, type: 'Chair', material: ['Wood', 'Textile'], materials: 'Solid wood, paper cord', origin: 'Denmark', status: 'In production', manufacturer: 'Carl Hansen & Søn', added: 21, art: 'wishbone',
      inShort: 'A dining chair by Hans J. Wegner from 1949, made by Carl Hansen & Søn. Its Y-shaped back support gives it its name, and the seat is woven by hand from paper cord.',
      story: [['From a Chinese chair', 'Wegner was inspired by portraits of Danish merchants sitting in Chinese Ming chairs. He reworked that chair several times, and the Wishbone was one result.'], ['Woven by hand', 'Each seat is woven from a long length of paper cord. The work is still done by hand.']] }),
    O({ dept: 'furniture', slug: 'butterfly-stool', name: 'Butterfly Stool', designer: 'sori-yanagi', year: 1954, type: 'Stool', material: ['Wood', 'Metal'], materials: 'Moulded plywood, brass', origin: 'Japan', status: 'In production', manufacturer: 'Tendo Mokko', added: 16, art: 'butterfly',
      inShort: 'A stool by Japanese designer Sori Yanagi from 1954. Two identical pieces of moulded plywood are joined by a single brass rod and a screw, and together they look like spread wings.',
      story: [['Two halves, one form', 'The stool is made from just two curved pieces, mirrored. The simplicity of the joint is what makes the form possible.'], ['East meets West', 'Moulded plywood was a Western technique, but the shape recalls Japanese architecture and calligraphy.']] }),
    O({ dept: 'furniture', slug: 'series-7', name: 'Series 7', designer: 'arne-jacobsen', year: 1955, type: 'Chair', material: ['Wood', 'Metal'], materials: 'Moulded plywood, steel', origin: 'Denmark', status: 'In production', manufacturer: 'Fritz Hansen', added: 22, art: 'series7',
      inShort: 'A stacking chair by Arne Jacobsen from 1955, made by Fritz Hansen. Seat and back are one piece of moulded plywood with a narrow waist, on slim steel legs.',
      story: [['One sheet of wood', 'The shell is pressed from layers of veneer into a single curved piece. The narrow waist lets it flex slightly, which makes it comfortable.'], ['Everywhere at once', 'It stacks, comes in many colours and fits into homes, offices and canteens. It is one of the most produced chairs in Danish design.']] }),
    O({ dept: 'furniture', slug: 'eames-lounge-chair', name: 'Lounge Chair', designer: 'charles-and-ray-eames', year: 1956, type: 'Lounge', material: ['Wood', 'Leather', 'Metal'], materials: 'Moulded plywood, leather, aluminium', origin: 'USA', status: 'In production', manufacturer: 'Herman Miller, Vitra', added: 25, art: 'eameslounge',
      inShort: 'A lounge chair and ottoman by Charles and Ray Eames from 1956. Three curved plywood shells hold leather cushions, on a swivelling aluminium base.',
      story: [['A modern club chair', 'The Eameses wanted to bring the comfort of a traditional English club chair into a modern form, made from their favourite material, moulded plywood.'], ['Made to age', 'Leather and wood were chosen to look better with use. The chair has been in production since its launch.']] }),
    O({ dept: 'furniture', slug: 'tulip-chair', name: 'Tulip Chair', designer: 'eero-saarinen', year: 1956, type: 'Chair', material: ['Plastic', 'Metal'], materials: 'Fibreglass shell, cast aluminium', origin: 'USA', status: 'In production', manufacturer: 'Knoll', added: 17, art: 'tulip',
      inShort: 'A chair by Eero Saarinen from 1956, made by Knoll. A moulded shell rises from a single slender pedestal, so the chair seems to grow from the floor like a flower.',
      story: [['Clearing the legs', 'Saarinen disliked the clutter of legs under tables and chairs. The pedestal was his way of cleaning up the space below.'], ['One form, many parts', 'Saarinen wanted the chair to be one material. The technology of the time required a shell and a separate metal base, finished in the same colour.']] }),
    O({ dept: 'furniture', slug: 'egg-chair', name: 'Egg Chair', designer: 'arne-jacobsen', year: 1958, type: 'Lounge', material: ['Textile', 'Metal'], materials: 'Upholstered shell, aluminium', origin: 'Denmark', status: 'In production', manufacturer: 'Fritz Hansen', added: 26, art: 'egg',
      inShort: 'A lounge chair by Arne Jacobsen from 1958, designed for the lobby of the SAS Royal Hotel in Copenhagen. Its enclosing shell creates a private space within a public room.',
      story: [['A room inside a room', 'In a busy hotel lobby, the high sides of the Egg give the sitter a small place of their own.'], ['Part of a building', 'Jacobsen designed the hotel and its interior together. The Egg was made to sit within that building’s straight lines.']] }),
    O({ dept: 'furniture', slug: 'panton-chair', name: 'Panton Chair', designer: 'verner-panton', year: 1960, type: 'Chair', material: ['Plastic'], materials: 'Plastic', origin: 'Denmark', status: 'In production', manufacturer: 'Vitra', added: 27, art: 'panton',
      inShort: 'A cantilever chair by Verner Panton, designed in 1960 and produced from 1967. It was the first chair made from a single piece of plastic, without legs in the usual sense.',
      story: [['A chair without parts', 'Panton imagined a chair made in one piece. It took years of development with Vitra before a material could make the shape stable enough.'], ['Colour as material', 'Because the colour runs through the plastic, the chair needs no paint. It became a symbol of 1960s optimism.']] }),

    /* Objects */
    O({ dept: 'objects', slug: 'aalto-vase', name: 'Aalto Vase', designer: 'alvar-aalto', year: 1936, type: 'Vase', material: ['Glass'], materials: 'Mouth-blown glass', origin: 'Finland', status: 'In production', manufacturer: 'Iittala', added: 23, art: 'aaltovase',
      inShort: 'A glass vase by Alvar Aalto from 1936, made by Iittala. Its wavy outline is one of the most recognised shapes in Finnish design. It is also known as the Savoy vase, after a Helsinki restaurant.',
      story: [['A wave in glass', 'Aalto entered the design in a glass competition and showed it at the 1937 World Fair in Paris. The free curves stood out among the strict geometry of the time.'], ['Made by mouth', 'The vases are still blown into moulds by hand, so each piece varies slightly.']] }),
    O({ dept: 'objects', slug: 'ball-clock', name: 'Ball Clock', designer: 'george-nelson', year: 1948, type: 'Clock', material: ['Wood', 'Metal'], materials: 'Wood, metal', origin: 'USA', status: 'In production', manufacturer: 'Vitra', added: 24, art: 'ballclock',
      inShort: 'A wall clock from the office of George Nelson, designed in 1948. Twelve wooden balls on metal rods replace the numbers, with Irving Harper often credited as its designer.',
      story: [['No numbers needed', 'The clock shows that people read the time from positions, not digits. Twelve balls are enough.'], ['An office of many hands', 'Like much of the work from Nelson’s studio, the clock was a team effort. Irving Harper is usually named as the designer.']] }),
    O({ dept: 'objects', slug: 'hang-it-all', name: 'Hang It All', designer: 'charles-and-ray-eames', year: 1953, type: 'Wall', material: ['Metal', 'Wood'], materials: 'Steel wire, wooden balls', origin: 'USA', status: 'In production', manufacturer: 'Vitra', added: 28, art: 'hangitall',
      inShort: 'A coat rack by Charles and Ray Eames from 1953. Colourful wooden balls on a wire frame give children a reason to hang up their things.',
      story: [['Tidying as a game', 'The Eameses designed the rack so children would enjoy hanging up coats and bags. The coloured balls invite it.'], ['Wire as structure', 'The frame uses the same wire technique the Eameses explored in their chairs at the time.']] }),
    O({ dept: 'objects', slug: 'kubus', name: 'Kubus', designer: 'mogens-lassen', year: 1962, type: 'Candleholder', material: ['Metal'], materials: 'Lacquered steel', origin: 'Denmark', status: 'In production', manufacturer: 'by Lassen', added: 2, art: 'kubus',
      inShort: 'A candleholder by Danish architect Mogens Lassen from 1962. A lattice cube of thin steel bars holds four candles, turning a strict grid into a warm object.',
      story: [['Architecture in miniature', 'Lassen was an architect, and the Kubus reads like a small building: a frame of equal squares.'], ['Back in production', 'For many years the design was hard to find. It is now produced again by by Lassen, a company started by his family.']] }),
    O({ dept: 'objects', slug: 'juicy-salif', name: 'Juicy Salif', designer: 'philippe-starck', year: 1990, type: 'Kitchen', material: ['Metal'], materials: 'Cast aluminium', origin: 'France', status: 'In production', manufacturer: 'Alessi', added: 1, art: 'juicysalif',
      inShort: 'A citrus squeezer by Philippe Starck from 1990, made by Alessi. Its body and long legs look like a creature from science fiction, and it divides opinion as a kitchen tool.',
      story: [['A sketch on a napkin', 'According to the often-told story, Starck sketched the first idea on a napkin while eating squid on the Italian coast.'], ['Object or tool', 'Many owners keep it on a shelf rather than use it. That tension between sculpture and utensil is part of why it became famous.']] })
  ];
  /* 100 additional objects; provenance in data/catalogue-sources.json. */
  var ADDITIONAL_DESIGNERS = [
  {
    "id": "achille-castiglioni-pio-manzu",
    "name": "Achille Castiglioni & Pio Manzù",
    "sort": "Castiglioni & Manzù",
    "short": "Castiglioni & Manzù",
    "country": "Italy"
  },
  {
    "id": "achille-castiglioni",
    "name": "Achille Castiglioni",
    "sort": "Castiglioni",
    "short": "Castiglioni",
    "country": "Italy"
  },
  {
    "id": "gino-sarfatti",
    "name": "Gino Sarfatti",
    "sort": "Sarfatti",
    "short": "Sarfatti",
    "country": "Italy"
  },
  {
    "id": "tobia-scarpa",
    "name": "Tobia Scarpa",
    "sort": "Scarpa",
    "short": "Scarpa",
    "country": "Italy"
  },
  {
    "id": "mario-bellini",
    "name": "Mario Bellini",
    "sort": "Bellini",
    "short": "Bellini",
    "country": "Italy"
  },
  {
    "id": "jasper-morrison",
    "name": "Jasper Morrison",
    "sort": "Morrison",
    "short": "Morrison",
    "country": "United Kingdom"
  },
  {
    "id": "konstantin-grcic",
    "name": "Konstantin Grcic",
    "sort": "Grcic",
    "short": "Grcic",
    "country": "Germany"
  },
  {
    "id": "sebastian-wrong",
    "name": "Sebastian Wrong",
    "sort": "Wrong",
    "short": "Wrong",
    "country": "United Kingdom"
  },
  {
    "id": "michael-anastassiades",
    "name": "Michael Anastassiades",
    "sort": "Anastassiades",
    "short": "Anastassiades",
    "country": "Cyprus"
  },
  {
    "id": "ronan-erwan-bouroullec",
    "name": "Ronan & Erwan Bouroullec",
    "sort": "Bouroullec",
    "short": "Bouroullec",
    "country": "France"
  },
  {
    "id": "edward-barber-jay-osgerby",
    "name": "Edward Barber & Jay Osgerby",
    "sort": "Barber & Osgerby",
    "short": "Barber & Osgerby",
    "country": "United Kingdom"
  },
  {
    "id": "patricia-urquiola",
    "name": "Patricia Urquiola",
    "sort": "Urquiola",
    "short": "Urquiola",
    "country": "Spain"
  },
  {
    "id": "piero-lissoni",
    "name": "Piero Lissoni",
    "sort": "Lissoni",
    "short": "Lissoni",
    "country": "Italy"
  },
  {
    "id": "johanna-grawunder",
    "name": "Johanna Grawunder",
    "sort": "Grawunder",
    "short": "Grawunder",
    "country": "USA"
  },
  {
    "id": "rodolfo-dordoni",
    "name": "Rodolfo Dordoni",
    "sort": "Dordoni",
    "short": "Dordoni",
    "country": "Italy"
  },
  {
    "id": "formafantasma",
    "name": "Formafantasma",
    "sort": "Formafantasma",
    "short": "Formafantasma",
    "country": "Italy"
  },
  {
    "id": "yrjo-kukkapuro",
    "name": "Yrjö Kukkapuro",
    "sort": "Kukkapuro",
    "short": "Kukkapuro",
    "country": "Finland"
  },
  {
    "id": "ilmari-tapiovaara",
    "name": "Ilmari Tapiovaara",
    "sort": "Tapiovaara",
    "short": "Tapiovaara",
    "country": "Finland"
  },
  {
    "id": "anna-maija-jaatinen",
    "name": "Anna-Maija Jaatinen",
    "sort": "Jaatinen",
    "short": "Jaatinen",
    "country": "Finland"
  },
  {
    "id": "eero-aarnio",
    "name": "Eero Aarnio",
    "sort": "Aarnio",
    "short": "Aarnio",
    "country": "Finland"
  },
  {
    "id": "aino-aalto",
    "name": "Aino Aalto",
    "sort": "Aalto",
    "short": "Aalto",
    "country": "Finland"
  },
  {
    "id": "michael-graves",
    "name": "Michael Graves",
    "sort": "Graves",
    "short": "Graves",
    "country": "USA"
  },
  {
    "id": "aldo-rossi",
    "name": "Aldo Rossi",
    "sort": "Rossi",
    "short": "Rossi",
    "country": "Italy"
  },
  {
    "id": "alessandro-mendini",
    "name": "Alessandro Mendini",
    "sort": "Mendini",
    "short": "Mendini",
    "country": "Italy"
  },
  {
    "id": "ettore-sottsass-alberto-gozzi",
    "name": "Ettore Sottsass & Alberto Gozzi",
    "sort": "Sottsass & Gozzi",
    "short": "Sottsass & Gozzi",
    "country": "Italy"
  },
  {
    "id": "alejandro-ruiz-csa",
    "name": "Alejandro Ruiz & CSA",
    "sort": "Ruiz & CSA",
    "short": "Ruiz & CSA",
    "country": "Argentina · Italy"
  },
  {
    "id": "michele-de-lucchi-solo",
    "name": "Michele De Lucchi",
    "sort": "Lucchi",
    "short": "Lucchi",
    "country": "Italy"
  },
  {
    "id": "giulio-iacchetti",
    "name": "Giulio Iacchetti",
    "sort": "Iacchetti",
    "short": "Iacchetti",
    "country": "Italy"
  },
  {
    "id": "david-chipperfield",
    "name": "David Chipperfield",
    "sort": "Chipperfield",
    "short": "Chipperfield",
    "country": "United Kingdom"
  },
  {
    "id": "emma-silvestris-lpwk",
    "name": "Emma Silvestris & LPWK",
    "sort": "Silvestris & LPWK",
    "short": "Silvestris & LPWK",
    "country": "Italy"
  },
  {
    "id": "adam-cornish",
    "name": "Adam Cornish",
    "sort": "Cornish",
    "short": "Cornish",
    "country": "Australia"
  },
  {
    "id": "michel-boucquillon-donia-maaoui",
    "name": "Michel Boucquillon & Donia Maaoui",
    "sort": "Boucquillon & Maaoui",
    "short": "Boucquillon & Maaoui",
    "country": "Belgium · Tunisia"
  },
  {
    "id": "fernando-humberto-campana",
    "name": "Fernando & Humberto Campana",
    "sort": "Campana",
    "short": "Campana",
    "country": "Brazil"
  },
  {
    "id": "mario-trimarchi",
    "name": "Mario Trimarchi",
    "sort": "Trimarchi",
    "short": "Trimarchi",
    "country": "Italy"
  },
  {
    "id": "ettore-sottsass",
    "name": "Ettore Sottsass",
    "sort": "Sottsass",
    "short": "Sottsass",
    "country": "Italy"
  },
  {
    "id": "stefano-giovannoni",
    "name": "Stefano Giovannoni",
    "sort": "Giovannoni",
    "short": "Giovannoni",
    "country": "Italy"
  },
  {
    "id": "miriam-mirri",
    "name": "Miriam Mirri",
    "sort": "Mirri",
    "short": "Mirri",
    "country": "Italy"
  },
  {
    "id": "stefano-giovannoni-guido-venturini",
    "name": "Stefano Giovannoni & Guido Venturini",
    "sort": "King-Kong",
    "short": "King-Kong",
    "country": "Italy"
  },
  {
    "id": "valerio-sommella",
    "name": "Valerio Sommella",
    "sort": "Sommella",
    "short": "Sommella",
    "country": "Italy"
  }
];
  ADDITIONAL_DESIGNERS.forEach(function (d) { DESIGNERS.push(d); dById[d.id] = d; });
  var ADDITIONAL_OBJECTS = [
  {
    "dept": "lighting",
    "slug": "snoopy",
    "name": "Snoopy",
    "year": 1967,
    "type": "Table",
    "material": [
      "Metal",
      "Marble",
      "Glass"
    ],
    "materials": "Metal, Marble, Glass",
    "origin": "Italy",
    "status": "In production",
    "manufacturer": "Flos",
    "inShort": "Snoopy is a table lamp by Achille & Pier Giacomo Castiglioni, from 1967, produced by Flos. A tilted marble cylinder supports an enamelled reflector whose long nose gives the lamp its cartoon-like profile.",
    "story": [
      [
        "Shape and construction",
        "A tilted marble cylinder supports an enamelled reflector whose long nose gives the lamp its cartoon-like profile."
      ],
      [
        "The idea in use",
        "Its heavy base and broad head make balance visible, while the concealed light falls directly onto the surface below."
      ]
    ],
    "source": "https://professional.flos.com/en/global/family/snoopy/",
    "expansion": true,
    "added": 130,
    "designer": "castiglioni"
  },
  {
    "dept": "lighting",
    "slug": "gatto",
    "name": "Gatto",
    "year": 1960,
    "type": "Table",
    "material": [
      "Metal",
      "Resin"
    ],
    "materials": "Metal, Resin",
    "origin": "Italy",
    "status": "In production",
    "manufacturer": "Flos",
    "inShort": "Gatto is a table lamp by Achille & Pier Giacomo Castiglioni, from 1960, produced by Flos. A thin cocoon skin stretches around a ribbed frame, making the lamp resemble a small lantern.",
    "story": [
      [
        "Shape and construction",
        "A thin cocoon skin stretches around a ribbed frame, making the lamp resemble a small lantern."
      ],
      [
        "The idea in use",
        "The coating softens the ribs without hiding them, so construction and diffused light share the same rounded envelope."
      ]
    ],
    "source": "https://professional.flos.com/en/global/family/gatto/",
    "expansion": true,
    "added": 127,
    "designer": "castiglioni"
  },
  {
    "dept": "lighting",
    "slug": "viscontea",
    "name": "Viscontea",
    "year": 1960,
    "type": "Pendant",
    "material": [
      "Metal",
      "Resin"
    ],
    "materials": "Metal, Resin",
    "origin": "Italy",
    "status": "In production",
    "manufacturer": "Flos",
    "inShort": "Viscontea is a pendant lamp by Achille & Pier Giacomo Castiglioni, from 1960, produced by Flos. A suspended steel frame is wrapped in translucent cocoon resin, with a gently pinched outline.",
    "story": [
      [
        "Shape and construction",
        "A suspended steel frame is wrapped in translucent cocoon resin, with a gently pinched outline."
      ],
      [
        "The idea in use",
        "The surface reads as a continuous membrane in daylight and becomes a luminous volume when the lamp is switched on."
      ]
    ],
    "source": "https://professional.flos.com/en/global/family/viscontea/",
    "expansion": true,
    "added": 124,
    "designer": "castiglioni"
  },
  {
    "dept": "lighting",
    "slug": "taraxacum",
    "name": "Taraxacum",
    "year": 1960,
    "type": "Pendant",
    "material": [
      "Metal",
      "Resin"
    ],
    "materials": "Metal, Resin",
    "origin": "Italy",
    "status": "In production",
    "manufacturer": "Flos",
    "inShort": "Taraxacum is a pendant lamp by Achille & Pier Giacomo Castiglioni, from 1960, produced by Flos. The cocoon diffuser follows an irregular frame, creating a cloud-like cluster of rounded projections.",
    "story": [
      [
        "Shape and construction",
        "The cocoon diffuser follows an irregular frame, creating a cloud-like cluster of rounded projections."
      ],
      [
        "The idea in use",
        "Its sculptural surface distributes light through a thin skin rather than through a conventional open shade."
      ]
    ],
    "source": "https://professional.flos.com/en/global/family/taraxacum/",
    "expansion": true,
    "added": 121,
    "designer": "castiglioni"
  },
  {
    "dept": "lighting",
    "slug": "toio",
    "name": "Toio",
    "year": 1962,
    "type": "Floor",
    "material": [
      "Metal"
    ],
    "materials": "Metal",
    "origin": "Italy",
    "status": "In production",
    "manufacturer": "Flos",
    "inShort": "Toio is a floor lamp by Achille & Pier Giacomo Castiglioni, from 1962, produced by Flos. A car-headlamp-like light source sits on a slender telescopic stem above an openly engineered base.",
    "story": [
      [
        "Shape and construction",
        "A car-headlamp-like light source sits on a slender telescopic stem above an openly engineered base."
      ],
      [
        "The idea in use",
        "Industrial components are brought into the living room without concealing how they work; the upward beam lights the ceiling."
      ]
    ],
    "source": "https://professional.flos.com/en/global/family/toio/",
    "expansion": true,
    "added": 118,
    "designer": "castiglioni"
  },
  {
    "dept": "lighting",
    "slug": "parentesi",
    "name": "Parentesi",
    "year": 1971,
    "type": "Floor",
    "material": [
      "Metal",
      "Rubber"
    ],
    "materials": "Metal, Rubber",
    "origin": "Italy",
    "status": "In production",
    "manufacturer": "Flos",
    "inShort": "Parentesi is a floor lamp by Achille Castiglioni & Pio Manzù, from 1971, produced by Flos. A bent tubular bracket grips a tensioned cable, carrying a spotlight that can slide vertically.",
    "story": [
      [
        "Shape and construction",
        "A bent tubular bracket grips a tensioned cable, carrying a spotlight that can slide vertically."
      ],
      [
        "The idea in use",
        "The cable replaces a conventional rigid stand, allowing height and direction to change while the footprint remains small."
      ]
    ],
    "source": "https://professional.flos.com/en/global/family/parentesi/",
    "expansion": true,
    "added": 115,
    "designer": "achille-castiglioni-pio-manzu"
  },
  {
    "dept": "lighting",
    "slug": "lampadina",
    "name": "Lampadina",
    "year": 1972,
    "type": "Table",
    "material": [
      "Metal",
      "Glass",
      "Plastic"
    ],
    "materials": "Metal, Glass, Plastic",
    "origin": "Italy",
    "status": "In production",
    "manufacturer": "Flos",
    "inShort": "Lampadina is a table lamp by Achille Castiglioni, from 1972, produced by Flos. An oversized partly frosted bulb sits above a compact holder and a reel-shaped metal base.",
    "story": [
      [
        "Shape and construction",
        "An oversized partly frosted bulb sits above a compact holder and a reel-shaped metal base."
      ],
      [
        "The idea in use",
        "The base stores spare cable, turning an ordinary electrical component into a deliberately compact piece of domestic lighting."
      ]
    ],
    "source": "https://professional.flos.com/en/global/family/lampadina/",
    "expansion": true,
    "added": 112,
    "designer": "achille-castiglioni"
  },
  {
    "dept": "lighting",
    "slug": "2097",
    "name": "2097",
    "year": 1958,
    "type": "Pendant",
    "material": [
      "Metal"
    ],
    "materials": "Metal",
    "origin": "Italy",
    "status": "In production",
    "manufacturer": "Flos",
    "inShort": "2097 is a pendant lamp by Gino Sarfatti, from 1958, produced by Flos. A central stem carries slim arms and exposed bulbs, with curved electrical cords left in view.",
    "story": [
      [
        "Shape and construction",
        "A central stem carries slim arms and exposed bulbs, with curved electrical cords left in view."
      ],
      [
        "The idea in use",
        "The arrangement borrows the scale of a chandelier while replacing ornamental decoration with the visible equipment of electric light."
      ]
    ],
    "source": "https://professional.flos.com/en/global/family/2097/",
    "expansion": true,
    "added": 109,
    "designer": "gino-sarfatti"
  },
  {
    "dept": "lighting",
    "slug": "biagio",
    "name": "Biagio",
    "year": 1968,
    "type": "Table",
    "material": [
      "Marble"
    ],
    "materials": "Marble",
    "origin": "Italy",
    "status": "In production",
    "manufacturer": "Flos",
    "inShort": "Biagio is a table lamp by Tobia Scarpa, from 1968, produced by Flos. A single sculptural marble body curves around the light source, combining a rounded head with a broad foot.",
    "story": [
      [
        "Shape and construction",
        "A single sculptural marble body curves around the light source, combining a rounded head with a broad foot."
      ],
      [
        "The idea in use",
        "Stone gives the compact lamp both weight and a strong outline; the hollowed opening directs the light downwards."
      ]
    ],
    "source": "https://professional.flos.com/en/global/family/biagio/",
    "expansion": true,
    "added": 106,
    "designer": "tobia-scarpa"
  },
  {
    "dept": "lighting",
    "slug": "chiara",
    "name": "Chiara Table",
    "year": 1969,
    "type": "Table",
    "material": [
      "Metal"
    ],
    "materials": "Metal",
    "origin": "Italy",
    "status": "In production",
    "manufacturer": "Flos",
    "inShort": "Chiara began as Mario Bellini’s folded-metal lighting design in 1969. The photograph shows the later compact table version. A reflective metal sheet folds into a cylindrical body and an angled hood, outlined by a dark edge.",
    "story": [
      [
        "Shape and construction",
        "A reflective metal sheet folds into a cylindrical body and an angled hood, outlined by a dark edge."
      ],
      [
        "The idea in use",
        "The sheet itself becomes structure and reflector, showing how a largely flat material can produce a complete lamp."
      ]
    ],
    "source": "https://professional.flos.com/en/global/family/chiara/",
    "expansion": true,
    "yearLabel": "1969 · family",
    "added": 103,
    "designer": "mario-bellini"
  },
  {
    "dept": "lighting",
    "slug": "glo-ball",
    "name": "Glo-Ball C/W",
    "year": 1998,
    "type": "Ceiling",
    "material": [
      "Glass",
      "Metal"
    ],
    "materials": "Glass, Metal",
    "origin": "United Kingdom",
    "status": "In production",
    "manufacturer": "Flos",
    "inShort": "Glo-Ball C/W is a ceiling lamp by Jasper Morrison, from 1998, produced by Flos. A gently flattened opal glass globe conceals its supporting hardware and spreads soft light.",
    "story": [
      [
        "Shape and construction",
        "A gently flattened opal glass globe conceals its supporting hardware and spreads soft light."
      ],
      [
        "The idea in use",
        "The slightly imperfect sphere gives the family its quiet character, keeping attention on light rather than on mechanical detail."
      ]
    ],
    "source": "https://professional.flos.com/en/global/family/glo-ball/",
    "expansion": true,
    "added": 100,
    "designer": "jasper-morrison"
  },
  {
    "dept": "lighting",
    "slug": "mayday",
    "name": "Mayday",
    "year": 2000,
    "type": "Table",
    "material": [
      "Plastic"
    ],
    "materials": "Plastic",
    "origin": "Germany",
    "status": "In production",
    "manufacturer": "Flos",
    "inShort": "Mayday is a table lamp by Konstantin Grcic, from 2000, produced by Flos. A translucent cone hangs beneath a large hook that also carries the lamp and winds its cable.",
    "story": [
      [
        "Shape and construction",
        "A translucent cone hangs beneath a large hook that also carries the lamp and winds its cable."
      ],
      [
        "The idea in use",
        "It treats portable utility lighting as a domestic object, equally comfortable resting on a surface or hanging from a support."
      ]
    ],
    "source": "https://professional.flos.com/en/global/family/mayday/",
    "expansion": true,
    "added": 97,
    "designer": "konstantin-grcic"
  },
  {
    "dept": "lighting",
    "slug": "spun-light",
    "name": "Spun Light T",
    "year": 2003,
    "type": "Table",
    "material": [
      "Metal"
    ],
    "materials": "Metal",
    "origin": "United Kingdom",
    "status": "In production",
    "manufacturer": "Flos",
    "inShort": "Spun Light T is a table lamp by Sebastian Wrong, from 2003, produced by Flos. A broad cylindrical shade meets a sharply tapered stem and circular base, all formed with smooth rotational surfaces.",
    "story": [
      [
        "Shape and construction",
        "A broad cylindrical shade meets a sharply tapered stem and circular base, all formed with smooth rotational surfaces."
      ],
      [
        "The idea in use",
        "Its familiar table-lamp silhouette is made continuous by controlled curves and a consistent treatment of the metal."
      ]
    ],
    "source": "https://professional.flos.com/en/global/family/spun-light/",
    "expansion": true,
    "added": 94,
    "designer": "sebastian-wrong"
  },
  {
    "dept": "lighting",
    "slug": "ic-lights",
    "name": "IC Lights C/W",
    "year": 2014,
    "type": "Wall",
    "material": [
      "Metal",
      "Glass"
    ],
    "materials": "Metal, Glass",
    "origin": "Cyprus",
    "status": "In production",
    "manufacturer": "Flos",
    "inShort": "IC Lights C/W is a wall lamp by Michael Anastassiades, from 2014, produced by Flos. An opal glass sphere appears to balance against a slender metal rod extending from the wall.",
    "story": [
      [
        "Shape and construction",
        "An opal glass sphere appears to balance against a slender metal rod extending from the wall."
      ],
      [
        "The idea in use",
        "The apparent instability is visual rather than structural: a fixed connection supports the globe while allowing the composition to feel light."
      ]
    ],
    "source": "https://professional.flos.com/en/global/family/ic-lights/",
    "expansion": true,
    "added": 91,
    "designer": "michael-anastassiades"
  },
  {
    "dept": "lighting",
    "slug": "aim",
    "name": "Aim",
    "year": 2013,
    "type": "Pendant",
    "material": [
      "Metal",
      "Plastic"
    ],
    "materials": "Metal, Plastic",
    "origin": "France",
    "status": "In production",
    "manufacturer": "Flos",
    "inShort": "Aim is a pendant lamp by Ronan & Erwan Bouroullec, from 2013, produced by Flos. Adjustable heads hang among long looping cables, making the electrical supply part of the composition.",
    "story": [
      [
        "Shape and construction",
        "Adjustable heads hang among long looping cables, making the electrical supply part of the composition."
      ],
      [
        "The idea in use",
        "Instead of prescribing one symmetrical arrangement, the system allows the light heads and cable lines to respond to the room."
      ]
    ],
    "source": "https://professional.flos.com/en/global/family/aim/",
    "expansion": true,
    "added": 88,
    "designer": "ronan-erwan-bouroullec"
  },
  {
    "dept": "lighting",
    "slug": "coordinates",
    "name": "Coordinates Wall",
    "year": 2020,
    "type": "Wall",
    "material": [
      "Metal",
      "Silicone"
    ],
    "materials": "Metal, Silicone",
    "origin": "Cyprus",
    "status": "In production",
    "manufacturer": "Flos",
    "inShort": "Coordinates Wall is a wall lamp by Michael Anastassiades, from 2020, produced by Flos. A linear light source sits against the wall with a compact circular mounting point.",
    "story": [
      [
        "Shape and construction",
        "A linear light source sits against the wall with a compact circular mounting point."
      ],
      [
        "The idea in use",
        "Its precise geometry translates the idea of intersecting coordinates into a lighting system whose lines can define an architectural surface."
      ]
    ],
    "source": "https://professional.flos.com/en/global/family/coordinates/",
    "expansion": true,
    "added": 85,
    "designer": "michael-anastassiades"
  },
  {
    "dept": "lighting",
    "slug": "bellhop",
    "name": "Bellhop Glass T",
    "year": 2024,
    "type": "Table",
    "material": [
      "Glass",
      "Metal"
    ],
    "materials": "Glass, Metal",
    "origin": "United Kingdom",
    "status": "In production",
    "manufacturer": "Flos",
    "inShort": "Bellhop Glass T is a table lamp by Edward Barber & Jay Osgerby, from 2024, produced by Flos. A large opal glass dome rests on a cylindrical aluminium base in the Bellhop Glass T.",
    "story": [
      [
        "Shape and construction",
        "A large opal glass dome rests on a cylindrical aluminium base in the Bellhop Glass T."
      ],
      [
        "The idea in use",
        "The familiar bell-shaped family becomes a substantial table lamp, using layered glass to create an even, softly glowing surface."
      ]
    ],
    "source": "https://flos.com/en/us/bellhop-glass-table/M-bellhop-glass-table.html",
    "expansion": true,
    "added": 82,
    "designer": "edward-barber-jay-osgerby"
  },
  {
    "dept": "lighting",
    "slug": "arrangements",
    "name": "Arrangements",
    "year": 2017,
    "type": "Pendant",
    "material": [
      "Metal",
      "Silicone"
    ],
    "materials": "Metal, Silicone",
    "origin": "Cyprus",
    "status": "In production",
    "manufacturer": "Flos",
    "inShort": "Arrangements is a pendant lamp by Michael Anastassiades, from 2017, produced by Flos. Luminous geometric elements connect into a suspended composition of loops and straight lines.",
    "story": [
      [
        "Shape and construction",
        "Luminous geometric elements connect into a suspended composition of loops and straight lines."
      ],
      [
        "The idea in use",
        "The system lets individual shapes become one light sculpture, with the supporting electrical connections integrated into their junctions."
      ]
    ],
    "source": "https://professional.flos.com/en/global/family/arrangements/",
    "expansion": true,
    "added": 79,
    "designer": "michael-anastassiades"
  },
  {
    "dept": "lighting",
    "slug": "ariette",
    "name": "Ariette",
    "year": 1973,
    "type": "Wall",
    "material": [
      "Fabric",
      "Plastic"
    ],
    "materials": "Fabric, Plastic",
    "origin": "Italy",
    "status": "In production",
    "manufacturer": "Flos",
    "inShort": "Ariette is a wall lamp by Tobia Scarpa, from 1973, produced by Flos. A square fabric diffuser stretches over a light framework, revealing its curved supporting lines.",
    "story": [
      [
        "Shape and construction",
        "A square fabric diffuser stretches over a light framework, revealing its curved supporting lines."
      ],
      [
        "The idea in use",
        "Its shallow, textile-covered construction brings the softness of a shade to a wall or ceiling rather than to a standing lamp."
      ]
    ],
    "source": "https://professional.flos.com/en/global/family/ariette/",
    "expansion": true,
    "added": 76,
    "designer": "tobia-scarpa"
  },
  {
    "dept": "lighting",
    "slug": "tatou",
    "name": "Tatou",
    "year": 2012,
    "type": "Table",
    "material": [
      "Plastic",
      "Metal"
    ],
    "materials": "Plastic, Metal",
    "origin": "Spain",
    "status": "In production",
    "manufacturer": "Flos",
    "inShort": "Tatou is a table lamp by Patricia Urquiola, from 2012, produced by Flos. A perforated rounded shade covers an inner diffuser, creating a patterned shell above a slender stem.",
    "story": [
      [
        "Shape and construction",
        "A perforated rounded shade covers an inner diffuser, creating a patterned shell above a slender stem."
      ],
      [
        "The idea in use",
        "The layered surface filters direct views of the light source while allowing a fine pattern of light and shadow to appear."
      ]
    ],
    "source": "https://professional.flos.com/en/global/family/tatou/",
    "expansion": true,
    "added": 73,
    "designer": "patricia-urquiola"
  },
  {
    "dept": "lighting",
    "slug": "tight-light",
    "name": "Tight Light",
    "year": 2009,
    "type": "Wall",
    "material": [
      "Metal"
    ],
    "materials": "Metal",
    "origin": "Italy",
    "status": "In production",
    "manufacturer": "Flos",
    "inShort": "Tight Light is a wall lamp by Piero Lissoni, from 2009, produced by Flos. A compact geometric wall fitting combines clean horizontal and vertical planes.",
    "story": [
      [
        "Shape and construction",
        "A compact geometric wall fitting combines clean horizontal and vertical planes."
      ],
      [
        "The idea in use",
        "The housing concentrates attention on the upward and downward light, allowing the surrounding wall to become part of the composition."
      ]
    ],
    "source": "https://professional.flos.com/en/global/family/tight-light/",
    "expansion": true,
    "added": 70,
    "designer": "piero-lissoni"
  },
  {
    "dept": "lighting",
    "slug": "tab",
    "name": "Tab T",
    "year": 2011,
    "type": "Desk",
    "material": [
      "Metal"
    ],
    "materials": "Metal",
    "origin": "United Kingdom",
    "status": "In production",
    "manufacturer": "Flos",
    "inShort": "Tab T is a desk lamp by Edward Barber & Jay Osgerby, from 2011, produced by Flos. A slim upright stem carries a narrow angled head with a projecting tab at one end.",
    "story": [
      [
        "Shape and construction",
        "A slim upright stem carries a narrow angled head with a projecting tab at one end."
      ],
      [
        "The idea in use",
        "The small tab makes adjustment legible, while the shallow head directs light towards the working surface without a large shade."
      ]
    ],
    "source": "https://professional.flos.com/en/global/family/tab/",
    "expansion": true,
    "added": 67,
    "designer": "edward-barber-jay-osgerby"
  },
  {
    "dept": "lighting",
    "slug": "smithfield",
    "name": "Smithfield",
    "year": 2009,
    "type": "Pendant",
    "material": [
      "Metal",
      "Plastic"
    ],
    "materials": "Metal, Plastic",
    "origin": "United Kingdom",
    "status": "In production",
    "manufacturer": "Flos",
    "inShort": "Smithfield is a pendant lamp by Jasper Morrison, from 2009, produced by Flos. A wide metal dome is closed underneath by a diffuser, giving the industrial silhouette a calm finish.",
    "story": [
      [
        "Shape and construction",
        "A wide metal dome is closed underneath by a diffuser, giving the industrial silhouette a calm finish."
      ],
      [
        "The idea in use",
        "The depth of the shade shields the light source and makes the large pendant read as one clearly defined volume."
      ]
    ],
    "source": "https://professional.flos.com/en/global/family/smithfield/",
    "expansion": true,
    "added": 64,
    "designer": "jasper-morrison"
  },
  {
    "dept": "lighting",
    "slug": "wan",
    "name": "Wan Ceiling",
    "year": 2005,
    "type": "Ceiling",
    "material": [
      "Metal",
      "Glass"
    ],
    "materials": "Metal, Glass",
    "origin": "USA",
    "status": "In production",
    "manufacturer": "Flos",
    "inShort": "Wan Ceiling is a ceiling lamp by Johanna Grawunder, from 2005, produced by Flos. A small bowl-shaped housing contains the recessed light source and its protective glass.",
    "story": [
      [
        "Shape and construction",
        "A small bowl-shaped housing contains the recessed light source and its protective glass."
      ],
      [
        "The idea in use",
        "The compact form gives a technical ceiling fitting a softer outline, bringing a domestic scale to directed overhead light."
      ]
    ],
    "source": "https://professional.flos.com/en/global/family/wan/",
    "expansion": true,
    "added": 61,
    "designer": "johanna-grawunder"
  },
  {
    "dept": "lighting",
    "slug": "pochette",
    "name": "Pochette",
    "year": 2003,
    "type": "Wall",
    "material": [
      "Metal"
    ],
    "materials": "Metal",
    "origin": "Italy",
    "status": "In production",
    "manufacturer": "Flos",
    "inShort": "Pochette is a wall lamp by Rodolfo Dordoni, from 2003, produced by Flos. A folded, pocket-like wall body opens at the top, concealing the light source inside.",
    "story": [
      [
        "Shape and construction",
        "A folded, pocket-like wall body opens at the top, concealing the light source inside."
      ],
      [
        "The idea in use",
        "The wall receives the main beam, so the small fitting is read together with the much larger wash of indirect light above it."
      ]
    ],
    "source": "https://professional.flos.com/en/global/family/pochette/",
    "expansion": true,
    "added": 58,
    "designer": "rodolfo-dordoni"
  },
  {
    "dept": "lighting",
    "slug": "stylos",
    "name": "Stylos",
    "year": 1984,
    "type": "Floor",
    "material": [
      "Plastic",
      "Metal"
    ],
    "materials": "Plastic, Metal",
    "origin": "Italy",
    "status": "In production",
    "manufacturer": "Flos",
    "inShort": "Stylos is a floor lamp by Achille Castiglioni, from 1984, produced by Flos. A tall opal cylinder rises from a broad circular metal base, with very little visible detail.",
    "story": [
      [
        "Shape and construction",
        "A tall opal cylinder rises from a broad circular metal base, with very little visible detail."
      ],
      [
        "The idea in use",
        "The column acts as a diffuser, turning a normally structural architectural form into an even vertical presence of light."
      ]
    ],
    "source": "https://professional.flos.com/en/global/family/stylos/",
    "expansion": true,
    "added": 55,
    "designer": "achille-castiglioni"
  },
  {
    "dept": "lighting",
    "slug": "wirering",
    "name": "Wirering",
    "year": 2018,
    "type": "Wall",
    "material": [
      "Rubber",
      "Metal"
    ],
    "materials": "Rubber, Metal",
    "origin": "Italy",
    "status": "In production",
    "manufacturer": "Flos",
    "inShort": "Wirering is a wall lamp by Formafantasma, from 2018, produced by Flos. A circular light and a long flat cable form a spare drawing against the wall.",
    "story": [
      [
        "Shape and construction",
        "A circular light and a long flat cable form a spare drawing against the wall."
      ],
      [
        "The idea in use",
        "The electrical cable is treated as a deliberate visual element, changing the relationship between a lamp and the line that powers it."
      ]
    ],
    "source": "https://professional.flos.com/en/global/family/wirering/",
    "expansion": true,
    "added": 52,
    "designer": "formafantasma"
  },
  {
    "dept": "lighting",
    "slug": "superloon",
    "name": "Superloon",
    "year": 2015,
    "type": "Floor",
    "material": [
      "Metal",
      "Plastic"
    ],
    "materials": "Metal, Plastic",
    "origin": "United Kingdom",
    "status": "In production",
    "manufacturer": "Flos",
    "inShort": "Superloon is a floor lamp by Jasper Morrison, from 2015, produced by Flos. A large circular light panel turns within a slender tripod support.",
    "story": [
      [
        "Shape and construction",
        "A large circular light panel turns within a slender tripod support."
      ],
      [
        "The idea in use",
        "The adjustable disc gives a broad luminous surface a precise direction, combining the scale of a reflector with a comparatively light frame."
      ]
    ],
    "source": "https://professional.flos.com/en/global/family/superloon/",
    "expansion": true,
    "added": 49,
    "designer": "jasper-morrison"
  },
  {
    "dept": "lighting",
    "slug": "ok",
    "name": "Ok",
    "year": 2014,
    "type": "Floor",
    "material": [
      "Metal",
      "Plastic"
    ],
    "materials": "Metal, Plastic",
    "origin": "Germany",
    "status": "In production",
    "manufacturer": "Flos",
    "inShort": "Ok is a floor lamp by Konstantin Grcic, from 2014, produced by Flos. A thin illuminated disc pivots beside a vertical tension cable and compact sliding body.",
    "story": [
      [
        "Shape and construction",
        "A thin illuminated disc pivots beside a vertical tension cable and compact sliding body."
      ],
      [
        "The idea in use",
        "The cable-based support revisits a familiar lighting idea with a flat light source, allowing both height and orientation to be adjusted."
      ]
    ],
    "source": "https://professional.flos.com/en/global/family/ok/",
    "expansion": true,
    "added": 46,
    "designer": "konstantin-grcic"
  },
  {
    "dept": "lighting",
    "slug": "pendant-light-a330s-golden-bell",
    "name": "A330S Golden Bell",
    "year": 1937,
    "type": "Pendant",
    "material": [
      "Metal"
    ],
    "materials": "Metal",
    "origin": "Finland",
    "status": "In production",
    "manufacturer": "Artek",
    "inShort": "A330S Golden Bell is a pendant lamp by Alvar Aalto, from 1937, produced by Artek. The Golden Bell pendant is a small rounded metal shell with a perforated lower rim.",
    "story": [
      [
        "Shape and construction",
        "The Golden Bell pendant is a small rounded metal shell with a perforated lower rim."
      ],
      [
        "The idea in use",
        "The lower edge breaks up the light around the opening, while the bell-shaped body reads as a complete sculptural object."
      ]
    ],
    "source": "https://www.artek.fi/en/products/pendant-light-a330s-golden-bell/",
    "expansion": true,
    "added": 43,
    "designer": "alvar-aalto"
  },
  {
    "dept": "lighting",
    "slug": "pendant-light-a331-beehive",
    "name": "A331 Beehive",
    "year": 1953,
    "type": "Pendant",
    "material": [
      "Metal"
    ],
    "materials": "Metal",
    "origin": "Finland",
    "status": "In production",
    "manufacturer": "Artek",
    "inShort": "A331 Beehive is a pendant lamp by Alvar Aalto, from 1953, produced by Artek. Stacked white bands and narrow metal rings make a rounded, hive-like pendant.",
    "story": [
      [
        "Shape and construction",
        "Stacked white bands and narrow metal rings make a rounded, hive-like pendant."
      ],
      [
        "The idea in use",
        "Light escapes between the layers as well as through the opening, giving the shade a clear rhythm even when seen from the side."
      ]
    ],
    "source": "https://www.artek.fi/en/products/pendant-light-a331-beehive/",
    "expansion": true,
    "added": 40,
    "designer": "alvar-aalto"
  },
  {
    "dept": "lighting",
    "slug": "pendant-light-a110-hand-grenade",
    "name": "A110 Hand Grenade",
    "year": 1952,
    "type": "Pendant",
    "material": [
      "Metal"
    ],
    "materials": "Metal",
    "origin": "Finland",
    "status": "In production",
    "manufacturer": "Artek",
    "inShort": "A110 Hand Grenade is a pendant lamp by Alvar Aalto, from 1952, produced by Artek. Two cylindrical volumes meet in a compact pendant, with a perforated ring around its lower opening.",
    "story": [
      [
        "Shape and construction",
        "Two cylindrical volumes meet in a compact pendant, with a perforated ring around its lower opening."
      ],
      [
        "The idea in use",
        "The narrow neck and wider shade distinguish the suspension from the light-producing body without introducing decorative parts."
      ]
    ],
    "source": "https://www.artek.fi/en/products/pendant-light-a110-hand-grenade/",
    "expansion": true,
    "added": 38,
    "designer": "alvar-aalto"
  },
  {
    "dept": "lighting",
    "slug": "pendant-light-a333-turnip",
    "name": "A333 Turnip",
    "year": 1950,
    "type": "Pendant",
    "material": [
      "Metal"
    ],
    "materials": "Metal",
    "origin": "Finland",
    "status": "In production",
    "manufacturer": "Artek",
    "inShort": "A333 Turnip is a pendant lamp by Alvar Aalto, from 1950, produced by Artek. A rounded lower body is capped by a small cylindrical neck, with a discreet opening beneath.",
    "story": [
      [
        "Shape and construction",
        "A rounded lower body is capped by a small cylindrical neck, with a discreet opening beneath."
      ],
      [
        "The idea in use",
        "The organic outline softens a simple metal shade, while its interior directs the light towards the surface below."
      ]
    ],
    "source": "https://www.artek.fi/en/products/pendant-light-a333-turnip/",
    "expansion": true,
    "added": 36,
    "designer": "alvar-aalto"
  },
  {
    "dept": "lighting",
    "slug": "floor-light-a805-angel-wing",
    "name": "A805 Angel Wing",
    "year": 1954,
    "type": "Floor",
    "material": [
      "Metal",
      "Leather"
    ],
    "materials": "Metal, Leather",
    "origin": "Finland",
    "status": "In production",
    "manufacturer": "Artek",
    "inShort": "A805 Angel Wing is a floor lamp by Alvar Aalto, from 1954, produced by Artek. An asymmetrical shade built from narrow metal bands spreads above a slender upright stem.",
    "story": [
      [
        "Shape and construction",
        "An asymmetrical shade built from narrow metal bands spreads above a slender upright stem."
      ],
      [
        "The idea in use",
        "The offset wing-like profile gives the light a direction, while the layered shade softens the transition between lit and shaded surfaces."
      ]
    ],
    "source": "https://www.artek.fi/en/products/floor-light-a805-angel-wing/",
    "expansion": true,
    "added": 34,
    "designer": "alvar-aalto"
  },
  {
    "dept": "lighting",
    "slug": "floor-light-a808",
    "name": "A808",
    "year": 1955,
    "type": "Floor",
    "material": [
      "Metal",
      "Leather"
    ],
    "materials": "Metal, Leather",
    "origin": "Finland",
    "status": "In production",
    "manufacturer": "Artek",
    "inShort": "A808 is a floor lamp by Alvar Aalto, from 1955, produced by Artek. A delicate ringed shade sits on a gently angled upper stem above a round base.",
    "story": [
      [
        "Shape and construction",
        "A delicate ringed shade sits on a gently angled upper stem above a round base."
      ],
      [
        "The idea in use",
        "The fine metal layers conceal the bulb and create a light, open silhouette rather than one heavy opaque dome."
      ]
    ],
    "source": "https://www.artek.fi/en/products/floor-light-a808/",
    "expansion": true,
    "added": 32,
    "designer": "alvar-aalto"
  },
  {
    "dept": "furniture",
    "slug": "stool-60",
    "name": "Stool 60",
    "year": 1933,
    "type": "Stool",
    "material": [
      "Wood"
    ],
    "materials": "Wood",
    "origin": "Finland",
    "status": "In production",
    "manufacturer": "Artek",
    "inShort": "Stool 60 is a stool by Alvar Aalto, from 1933, produced by Artek. Three bent birch legs support a plain circular seat, forming a compact stool that can also serve as a side table.",
    "story": [
      [
        "Shape and construction",
        "Three bent birch legs support a plain circular seat, forming a compact stool that can also serve as a side table."
      ],
      [
        "The idea in use",
        "The L-shaped leg is the essential joint: its bend carries the seat while keeping the number of separate components small."
      ]
    ],
    "source": "https://www.artek.fi/en/products/stool-60",
    "expansion": true,
    "added": 129,
    "designer": "alvar-aalto"
  },
  {
    "dept": "furniture",
    "slug": "karuselli-lounge-chair",
    "name": "Karuselli Lounge Chair",
    "year": 1964,
    "type": "Lounge",
    "material": [
      "Plastic",
      "Leather",
      "Metal"
    ],
    "materials": "Plastic, Leather, Metal",
    "origin": "Finland",
    "status": "In production",
    "manufacturer": "Artek",
    "inShort": "Karuselli Lounge Chair is a lounge by Yrjö Kukkapuro, from 1964, produced by Artek. An upholstered sculptural shell tilts above a pedestal base, bringing the back, arms and seat into one flowing body.",
    "story": [
      [
        "Shape and construction",
        "An upholstered sculptural shell tilts above a pedestal base, bringing the back, arms and seat into one flowing body."
      ],
      [
        "The idea in use",
        "The pronounced curves support the sitter from several directions, making comfort visible in the outline of the chair."
      ]
    ],
    "source": "https://www.artek.fi/en/products/karuselli-lounge-chair",
    "expansion": true,
    "added": 126,
    "designer": "yrjo-kukkapuro"
  },
  {
    "dept": "furniture",
    "slug": "armchair-400-tank",
    "name": "Armchair 400 “Tank“",
    "year": 1936,
    "type": "Lounge",
    "material": [
      "Wood",
      "Fabric"
    ],
    "materials": "Wood, Fabric",
    "origin": "Finland",
    "status": "In production",
    "manufacturer": "Artek",
    "inShort": "Armchair 400 “Tank“ is a lounge by Alvar Aalto, from 1936, produced by Artek. Broad bentwood arms wrap around a deep upholstered seat, giving Armchair 400 its substantial presence.",
    "story": [
      [
        "Shape and construction",
        "Broad bentwood arms wrap around a deep upholstered seat, giving Armchair 400 its substantial presence."
      ],
      [
        "The idea in use",
        "The generous wooden loops carry the body without a separate rear leg, combining visual weight with a resilient cantilever structure."
      ]
    ],
    "source": "https://www.artek.fi/en/products/armchair-400-tank",
    "expansion": true,
    "added": 123,
    "designer": "alvar-aalto"
  },
  {
    "dept": "furniture",
    "slug": "domus-lounge-chair",
    "name": "Domus Lounge Chair",
    "year": 1946,
    "type": "Lounge",
    "material": [
      "Wood",
      "Fabric"
    ],
    "materials": "Wood, Fabric",
    "origin": "Finland",
    "status": "In production",
    "manufacturer": "Artek",
    "inShort": "Domus Lounge Chair is a lounge by Ilmari Tapiovaara, from 1946, produced by Artek. A broad moulded seat and back sit within an open timber frame with short armrests.",
    "story": [
      [
        "Shape and construction",
        "A broad moulded seat and back sit within an open timber frame with short armrests."
      ],
      [
        "The idea in use",
        "The compact arms leave the front of the chair accessible while giving the sitter a small, clearly defined resting point."
      ]
    ],
    "source": "https://www.artek.fi/en/products/domus-lounge-chair",
    "expansion": true,
    "added": 120,
    "designer": "ilmari-tapiovaara"
  },
  {
    "dept": "furniture",
    "slug": "domus-chair",
    "name": "Domus Chair",
    "year": 1946,
    "type": "Chair",
    "material": [
      "Wood",
      "Fabric"
    ],
    "materials": "Wood, Fabric",
    "origin": "Finland",
    "status": "In production",
    "manufacturer": "Artek",
    "inShort": "Domus Chair is a chair by Ilmari Tapiovaara, from 1946, produced by Artek. A shaped seat, supportive back and abbreviated armrests make a compact wooden dining and working chair.",
    "story": [
      [
        "Shape and construction",
        "A shaped seat, supportive back and abbreviated armrests make a compact wooden dining and working chair."
      ],
      [
        "The idea in use",
        "Its rounded contact points soften the otherwise straightforward frame, showing how small changes can make an everyday chair more accommodating."
      ]
    ],
    "source": "https://www.artek.fi/en/products/domus-chair",
    "expansion": true,
    "added": 117,
    "designer": "ilmari-tapiovaara"
  },
  {
    "dept": "furniture",
    "slug": "tea-trolley-901",
    "name": "Tea Trolley 901",
    "year": 1936,
    "type": "Table",
    "material": [
      "Wood",
      "Linoleum"
    ],
    "materials": "Wood, Linoleum",
    "origin": "Finland",
    "status": "In production",
    "manufacturer": "Artek",
    "inShort": "Tea Trolley 901 is a table by Alvar Aalto, from 1936, produced by Artek. Two shelves sit within a continuous bentwood frame carried by a pair of large wheels.",
    "story": [
      [
        "Shape and construction",
        "Two shelves sit within a continuous bentwood frame carried by a pair of large wheels."
      ],
      [
        "The idea in use",
        "The trolley combines storage and movement in one clear structure, keeping the handle and support within the same looping outline."
      ]
    ],
    "source": "https://www.artek.fi/en/products/tea-trolley-901",
    "expansion": true,
    "added": 114,
    "designer": "alvar-aalto"
  },
  {
    "dept": "furniture",
    "slug": "clothes-tree-160",
    "name": "Clothes Tree 160",
    "year": 1964,
    "type": "Storage",
    "material": [
      "Wood",
      "Metal"
    ],
    "materials": "Wood, Metal",
    "origin": "Finland",
    "status": "In production",
    "manufacturer": "Artek",
    "inShort": "Clothes Tree 160 is a storage piece by Anna-Maija Jaatinen, from 1964, produced by Artek. A slim upright tree branches into pegs of different lengths above a stable multi-foot base.",
    "story": [
      [
        "Shape and construction",
        "A slim upright tree branches into pegs of different lengths above a stable multi-foot base."
      ],
      [
        "The idea in use",
        "Longer upper hooks and shorter lower hooks create a practical hierarchy, giving coats and smaller belongings separate places to hang."
      ]
    ],
    "source": "https://www.artek.fi/en/products/clothes-tree-160",
    "expansion": true,
    "added": 111,
    "designer": "anna-maija-jaatinen"
  },
  {
    "dept": "furniture",
    "slug": "tea-trolley-900",
    "name": "Tea Trolley 900",
    "year": 1937,
    "type": "Table",
    "material": [
      "Wood",
      "Ceramic",
      "Rattan"
    ],
    "materials": "Wood, Ceramic, Rattan",
    "origin": "Finland",
    "status": "In production",
    "manufacturer": "Artek",
    "inShort": "Tea Trolley 900 is a table by Alvar Aalto, from 1937, produced by Artek. A tiled serving surface and woven basket travel on large wheels within a curved wooden frame.",
    "story": [
      [
        "Shape and construction",
        "A tiled serving surface and woven basket travel on large wheels within a curved wooden frame."
      ],
      [
        "The idea in use",
        "Hard, smooth tiles and soft woven storage give the trolley two different ways to hold everyday objects without enclosing them in a cabinet."
      ]
    ],
    "source": "https://www.artek.fi/en/products/tea-trolley-900",
    "expansion": true,
    "added": 108,
    "designer": "alvar-aalto"
  },
  {
    "dept": "furniture",
    "slug": "armchair-402",
    "name": "Armchair 402",
    "year": 1933,
    "type": "Lounge",
    "material": [
      "Wood",
      "Fabric"
    ],
    "materials": "Wood, Fabric",
    "origin": "Finland",
    "status": "In production",
    "manufacturer": "Artek",
    "inShort": "Armchair 402 is a lounge by Alvar Aalto, from 1933, produced by Artek. A continuous wooden cantilever supports a deep cushioned seat and a gently inclined back.",
    "story": [
      [
        "Shape and construction",
        "A continuous wooden cantilever supports a deep cushioned seat and a gently inclined back."
      ],
      [
        "The idea in use",
        "The resilient frame gives the chair its spring, letting a structural bend contribute directly to the experience of sitting."
      ]
    ],
    "source": "https://www.artek.fi/en/products/armchair-402",
    "expansion": true,
    "added": 105,
    "designer": "alvar-aalto"
  },
  {
    "dept": "furniture",
    "slug": "armchair-406",
    "name": "Armchair 406",
    "year": 1939,
    "type": "Lounge",
    "material": [
      "Wood",
      "Fabric"
    ],
    "materials": "Wood, Fabric",
    "origin": "Finland",
    "status": "In production",
    "manufacturer": "Artek",
    "inShort": "Armchair 406 is a lounge by Alvar Aalto, from 1939, produced by Artek. A woven seat and back stretch between laminated birch rails and curved wooden armrests.",
    "story": [
      [
        "Shape and construction",
        "A woven seat and back stretch between laminated birch rails and curved wooden armrests."
      ],
      [
        "The idea in use",
        "The open webbing reduces the visual mass of the chair and allows a simple wooden structure to carry a flexible sitting surface."
      ]
    ],
    "source": "https://www.artek.fi/en/products/armchair-406",
    "expansion": true,
    "added": 102,
    "designer": "alvar-aalto"
  },
  {
    "dept": "furniture",
    "slug": "rocket-bar-stool",
    "name": "Rocket Bar Stool",
    "year": 1995,
    "type": "Stool",
    "material": [
      "Wood"
    ],
    "materials": "Wood",
    "origin": "Finland",
    "status": "In production",
    "manufacturer": "Artek",
    "inShort": "Rocket Bar Stool is a stool by Eero Aarnio, from 1995, produced by Artek. Three turned legs spread beneath a circular seat, with connecting braces that suggest a small launch structure.",
    "story": [
      [
        "Shape and construction",
        "Three turned legs spread beneath a circular seat, with connecting braces that suggest a small launch structure."
      ],
      [
        "The idea in use",
        "Its solid timber parts give the tall stool a playful silhouette while the broad leg placement keeps the composition grounded."
      ]
    ],
    "source": "https://www.artek.fi/en/products/rocket-bar-stool",
    "expansion": true,
    "added": 99,
    "designer": "eero-aarnio"
  },
  {
    "dept": "furniture",
    "slug": "mademoiselle-lounge-chair",
    "name": "Mademoiselle Lounge Chair",
    "year": 1956,
    "type": "Lounge",
    "material": [
      "Wood"
    ],
    "materials": "Wood",
    "origin": "Finland",
    "status": "In production",
    "manufacturer": "Artek",
    "inShort": "Mademoiselle Lounge Chair is a lounge by Ilmari Tapiovaara, from 1956, produced by Artek. A fan of slender wooden spindles rises above a low, broad seat.",
    "story": [
      [
        "Shape and construction",
        "A fan of slender wooden spindles rises above a low, broad seat."
      ],
      [
        "The idea in use",
        "The repeated uprights make the tall back visually light, balancing a generous sitting surface with a fine linear structure."
      ]
    ],
    "source": "https://www.artek.fi/en/products/mademoiselle-lounge-chair",
    "expansion": true,
    "added": 96,
    "designer": "ilmari-tapiovaara"
  },
  {
    "dept": "furniture",
    "slug": "mademoiselle-rocking-chair",
    "name": "Mademoiselle Rocking Chair",
    "year": 1956,
    "type": "Lounge",
    "material": [
      "Wood"
    ],
    "materials": "Wood",
    "origin": "Finland",
    "status": "In production",
    "manufacturer": "Artek",
    "inShort": "Mademoiselle Rocking Chair is a lounge by Ilmari Tapiovaara, from 1956, produced by Artek. A tall spindle back and low seat are carried on long curved rocking runners.",
    "story": [
      [
        "Shape and construction",
        "A tall spindle back and low seat are carried on long curved rocking runners."
      ],
      [
        "The idea in use",
        "The open back preserves the lightness of the lounge-chair family while the runners extend its silhouette into a gentle rocking motion."
      ]
    ],
    "source": "https://www.artek.fi/en/products/mademoiselle-rocking-chair",
    "expansion": true,
    "added": 93,
    "designer": "ilmari-tapiovaara"
  },
  {
    "dept": "furniture",
    "slug": "chair-66",
    "name": "Chair 66",
    "year": 1935,
    "type": "Chair",
    "material": [
      "Wood"
    ],
    "materials": "Wood",
    "origin": "Finland",
    "status": "In production",
    "manufacturer": "Artek",
    "inShort": "Chair 66 is a chair by Alvar Aalto, from 1935, produced by Artek. A circular seat and a wide pierced backrest sit on a straightforward wooden frame.",
    "story": [
      [
        "Shape and construction",
        "A circular seat and a wide pierced backrest sit on a straightforward wooden frame."
      ],
      [
        "The idea in use",
        "The broad top rail gives the compact chair a distinctive face, while the visible assembly keeps its construction easy to read."
      ]
    ],
    "source": "https://www.artek.fi/en/products/chair-66",
    "expansion": true,
    "added": 90,
    "designer": "alvar-aalto"
  },
  {
    "dept": "furniture",
    "slug": "chair-69",
    "name": "Chair 69",
    "year": 1935,
    "type": "Chair",
    "material": [
      "Wood"
    ],
    "materials": "Wood",
    "origin": "Finland",
    "status": "In production",
    "manufacturer": "Artek",
    "inShort": "Chair 69 is a chair by Alvar Aalto, from 1935, produced by Artek. A broad seat and supportive curved back are held by sturdy timber legs.",
    "story": [
      [
        "Shape and construction",
        "A broad seat and supportive curved back are held by sturdy timber legs."
      ],
      [
        "The idea in use",
        "The chair uses restrained shaping where the body meets the wood, allowing a simple dining-chair structure to feel generous and durable."
      ]
    ],
    "source": "https://www.artek.fi/en/products/chair-69",
    "expansion": true,
    "added": 87,
    "designer": "alvar-aalto"
  },
  {
    "dept": "furniture",
    "slug": "wall-shelf-112",
    "name": "Wall Shelf 112",
    "year": 1936,
    "type": "Storage",
    "material": [
      "Wood"
    ],
    "materials": "Wood",
    "origin": "Finland",
    "status": "In production",
    "manufacturer": "Artek",
    "inShort": "Wall Shelf 112 is a storage piece by Alvar Aalto, from 1936, produced by Artek. Two looped laminated supports carry a horizontal birch shelf.",
    "story": [
      [
        "Shape and construction",
        "Two looped laminated supports carry a horizontal birch shelf."
      ],
      [
        "The idea in use",
        "The brackets turn a necessary supporting part into the defining feature, giving a small wall shelf a clear architectural rhythm."
      ]
    ],
    "source": "https://www.artek.fi/en/products/wall-shelf-112",
    "expansion": true,
    "added": 84,
    "designer": "alvar-aalto"
  },
  {
    "dept": "furniture",
    "slug": "kaari-desk",
    "name": "Kaari Desk",
    "year": 2015,
    "type": "Desk",
    "material": [
      "Wood",
      "Metal",
      "Linoleum"
    ],
    "materials": "Wood, Metal, Linoleum",
    "origin": "France",
    "status": "In production",
    "manufacturer": "Artek",
    "inShort": "Kaari Desk is a desk by Ronan & Erwan Bouroullec, from 2015, produced by Artek. Timber uprights and sweeping steel braces support a thin desk surface.",
    "story": [
      [
        "Shape and construction",
        "Timber uprights and sweeping steel braces support a thin desk surface."
      ],
      [
        "The idea in use",
        "The curved metal line ties top and legs together, making the structural reinforcement read like a continuous drawing beneath the desk."
      ]
    ],
    "source": "https://www.artek.fi/en/products/kaari-desk",
    "expansion": true,
    "added": 81,
    "designer": "ronan-erwan-bouroullec"
  },
  {
    "dept": "furniture",
    "slug": "kiki-low-table",
    "name": "Kiki Low Table",
    "year": 1960,
    "type": "Table",
    "material": [
      "Metal",
      "Laminate"
    ],
    "materials": "Metal, Laminate",
    "origin": "Finland",
    "status": "In production",
    "manufacturer": "Artek",
    "inShort": "Kiki Low Table is a table by Ilmari Tapiovaara, from 1960, produced by Artek. A slim rectangular top rests on a compact frame of oval steel tubing.",
    "story": [
      [
        "Shape and construction",
        "A slim rectangular top rests on a compact frame of oval steel tubing."
      ],
      [
        "The idea in use",
        "The repeated oval section gives the low table a precise profile, allowing it to sit beside upholstered pieces without dominating them."
      ]
    ],
    "source": "https://www.artek.fi/en/products/kiki-low-table",
    "expansion": true,
    "added": 78,
    "designer": "ilmari-tapiovaara"
  },
  {
    "dept": "furniture",
    "slug": "kiki-bench",
    "name": "Kiki Bench",
    "year": 1960,
    "type": "Bench",
    "material": [
      "Metal",
      "Fabric"
    ],
    "materials": "Metal, Fabric",
    "origin": "Finland",
    "status": "In production",
    "manufacturer": "Artek",
    "inShort": "Kiki Bench is a bench by Ilmari Tapiovaara, from 1960, produced by Artek. A long upholstered pad sits above an open tubular steel base.",
    "story": [
      [
        "Shape and construction",
        "A long upholstered pad sits above an open tubular steel base."
      ],
      [
        "The idea in use",
        "The bench reduces seating to a clear horizontal surface, with narrow supports that keep the space below visually open."
      ]
    ],
    "source": "https://www.artek.fi/en/products/kiki-bench",
    "expansion": true,
    "added": 75,
    "designer": "ilmari-tapiovaara"
  },
  {
    "dept": "furniture",
    "slug": "kiki-sofa",
    "name": "Kiki Sofa",
    "year": 1960,
    "type": "Sofa",
    "material": [
      "Metal",
      "Fabric"
    ],
    "materials": "Metal, Fabric",
    "origin": "Finland",
    "status": "In production",
    "manufacturer": "Artek",
    "inShort": "Kiki Sofa is a sofa by Ilmari Tapiovaara, from 1960, produced by Artek. Flat upholstered cushions sit within a restrained steel frame, making a compact linear sofa.",
    "story": [
      [
        "Shape and construction",
        "Flat upholstered cushions sit within a restrained steel frame, making a compact linear sofa."
      ],
      [
        "The idea in use",
        "Its separate seat and back volumes keep the outline legible, allowing fabric and tubular metal to do different visual jobs."
      ]
    ],
    "source": "https://www.artek.fi/en/products/kiki-sofa",
    "expansion": true,
    "added": 72,
    "designer": "ilmari-tapiovaara"
  },
  {
    "dept": "furniture",
    "slug": "kiki-lounge-chair",
    "name": "Kiki Lounge Chair",
    "year": 1960,
    "type": "Lounge",
    "material": [
      "Metal",
      "Fabric"
    ],
    "materials": "Metal, Fabric",
    "origin": "Finland",
    "status": "In production",
    "manufacturer": "Artek",
    "inShort": "Kiki Lounge Chair is a lounge by Ilmari Tapiovaara, from 1960, produced by Artek. A low upholstered seat and straight back are carried by an oval-tube metal frame.",
    "story": [
      [
        "Shape and construction",
        "A low upholstered seat and straight back are carried by an oval-tube metal frame."
      ],
      [
        "The idea in use",
        "The open base makes the chair comparatively light in a room, while its upholstery defines a clear place to sit."
      ]
    ],
    "source": "https://www.artek.fi/en/products/kiki-lounge-chair",
    "expansion": true,
    "added": 69,
    "designer": "ilmari-tapiovaara"
  },
  {
    "dept": "furniture",
    "slug": "armchair-401",
    "name": "Armchair 401",
    "year": 1933,
    "type": "Lounge",
    "material": [
      "Wood",
      "Fabric"
    ],
    "materials": "Wood, Fabric",
    "origin": "Finland",
    "status": "In production",
    "manufacturer": "Artek",
    "inShort": "Armchair 401 is a lounge by Alvar Aalto, from 1933, produced by Artek. A high upholstered back rises above curved wooden arms and a sprung cantilever frame.",
    "story": [
      [
        "Shape and construction",
        "A high upholstered back rises above curved wooden arms and a sprung cantilever frame."
      ],
      [
        "The idea in use",
        "The tall back supports the head and shoulders, while the sweeping wood brings a continuous outline around the softer upholstered body."
      ]
    ],
    "source": "https://www.artek.fi/en/products/armchair-401",
    "expansion": true,
    "added": 66,
    "designer": "alvar-aalto"
  },
  {
    "dept": "furniture",
    "slug": "bench-153a",
    "name": "Bench 153A",
    "year": 1945,
    "type": "Bench",
    "material": [
      "Wood"
    ],
    "materials": "Wood",
    "origin": "Finland",
    "status": "In production",
    "manufacturer": "Artek",
    "inShort": "Bench 153A is a bench by Alvar Aalto, from 1945, produced by Artek. Closely spaced timber slats form a bench carried by bent birch legs.",
    "story": [
      [
        "Shape and construction",
        "Closely spaced timber slats form a bench carried by bent birch legs."
      ],
      [
        "The idea in use",
        "The gaps reduce the visual weight of the long seat and make the relationship between surface and frame immediately visible."
      ]
    ],
    "source": "https://www.artek.fi/en/products/bench-153a",
    "expansion": true,
    "added": 63,
    "designer": "alvar-aalto"
  },
  {
    "dept": "furniture",
    "slug": "bar-stool-64",
    "name": "Bar Stool 64",
    "year": 1935,
    "type": "Stool",
    "material": [
      "Wood",
      "Metal"
    ],
    "materials": "Wood, Metal",
    "origin": "Finland",
    "status": "In production",
    "manufacturer": "Artek",
    "inShort": "Bar Stool 64 is a stool by Alvar Aalto, from 1935, produced by Artek. A round seat stands on four bentwood legs joined by a low circular footrest.",
    "story": [
      [
        "Shape and construction",
        "A round seat stands on four bentwood legs joined by a low circular footrest."
      ],
      [
        "The idea in use",
        "The non-directional seat works from any side, while the footrest gives a tall wooden structure an additional horizontal connection."
      ]
    ],
    "source": "https://www.artek.fi/en/products/bar-stool-64",
    "expansion": true,
    "added": 60,
    "designer": "alvar-aalto"
  },
  {
    "dept": "furniture",
    "slug": "chair-65",
    "name": "Chair 65",
    "year": 1935,
    "type": "Chair",
    "material": [
      "Wood"
    ],
    "materials": "Wood",
    "origin": "Finland",
    "status": "In production",
    "manufacturer": "Artek",
    "inShort": "Chair 65 is a chair by Alvar Aalto, from 1935, produced by Artek. A low curved plywood back sits close above a circular wooden seat.",
    "story": [
      [
        "Shape and construction",
        "A low curved plywood back sits close above a circular wooden seat."
      ],
      [
        "The idea in use",
        "The restrained backrest provides support without rising far above the table, giving the chair a quiet, compact profile."
      ]
    ],
    "source": "https://www.artek.fi/en/products/chair-65",
    "expansion": true,
    "added": 57,
    "designer": "alvar-aalto"
  },
  {
    "dept": "furniture",
    "slug": "chair-68",
    "name": "Chair 68",
    "year": 1935,
    "type": "Chair",
    "material": [
      "Wood"
    ],
    "materials": "Wood",
    "origin": "Finland",
    "status": "In production",
    "manufacturer": "Artek",
    "inShort": "Chair 68 is a chair by Alvar Aalto, from 1935, produced by Artek. A narrow curved rail and two upright wooden pieces form the back above a circular seat.",
    "story": [
      [
        "Shape and construction",
        "A narrow curved rail and two upright wooden pieces form the back above a circular seat."
      ],
      [
        "The idea in use",
        "The small number of clearly separated parts gives the chair a spare outline while retaining support across the lower back."
      ]
    ],
    "source": "https://www.artek.fi/en/products/chair-68",
    "expansion": true,
    "added": 54,
    "designer": "alvar-aalto"
  },
  {
    "dept": "furniture",
    "slug": "chair-611",
    "name": "Chair 611",
    "year": 1929,
    "type": "Chair",
    "material": [
      "Wood",
      "Fabric"
    ],
    "materials": "Wood, Fabric",
    "origin": "Finland",
    "status": "In production",
    "manufacturer": "Artek",
    "inShort": "Chair 611 is a chair by Alvar Aalto, from 1929, produced by Artek. Woven fabric bands cross a straight birch frame to form both seat and back.",
    "story": [
      [
        "Shape and construction",
        "Woven fabric bands cross a straight birch frame to form both seat and back."
      ],
      [
        "The idea in use",
        "The webbing adds flexibility without thick upholstery, leaving the supporting timber visible around every edge of the chair."
      ]
    ],
    "source": "https://www.artek.fi/en/products/chair-611",
    "expansion": true,
    "added": 51,
    "designer": "alvar-aalto"
  },
  {
    "dept": "furniture",
    "slug": "lukki-chair",
    "name": "Lukki Chair",
    "year": 1951,
    "type": "Chair",
    "material": [
      "Metal",
      "Wood"
    ],
    "materials": "Metal, Wood",
    "origin": "Finland",
    "status": "In production",
    "manufacturer": "Artek",
    "inShort": "Lukki Chair is a chair by Ilmari Tapiovaara, from 1951, produced by Artek. A tubular metal frame carries moulded wooden panels for the seat, back and compact arms.",
    "story": [
      [
        "Shape and construction",
        "A tubular metal frame carries moulded wooden panels for the seat, back and compact arms."
      ],
      [
        "The idea in use",
        "Its narrow supports and projecting armrests give the chair an insect-like outline while preserving a practical, compact footprint."
      ]
    ],
    "source": "https://www.artek.fi/en/products/lukki-chair",
    "expansion": true,
    "added": 48,
    "designer": "ilmari-tapiovaara"
  },
  {
    "dept": "furniture",
    "slug": "rival-chair",
    "name": "Rival Chair",
    "year": 2014,
    "type": "Chair",
    "material": [
      "Wood",
      "Plastic",
      "Fabric"
    ],
    "materials": "Wood, Plastic, Fabric",
    "origin": "Germany",
    "status": "In production",
    "manufacturer": "Artek",
    "inShort": "Rival Chair is a chair by Konstantin Grcic, from 2014, produced by Artek. A rounded wooden back joins short arms above a shaped seat and widely spaced legs.",
    "story": [
      [
        "Shape and construction",
        "A rounded wooden back joins short arms above a shaped seat and widely spaced legs."
      ],
      [
        "The idea in use",
        "The backrest and legs use different ways of forming timber, bringing moulded curves and solid milled components into one chair."
      ]
    ],
    "source": "https://www.artek.fi/en/products/rival-chair",
    "expansion": true,
    "added": 45,
    "designer": "konstantin-grcic"
  },
  {
    "dept": "furniture",
    "slug": "armchair-42",
    "name": "Armchair 42",
    "year": 1932,
    "type": "Lounge",
    "material": [
      "Wood"
    ],
    "materials": "Wood",
    "origin": "Finland",
    "status": "In production",
    "manufacturer": "Artek",
    "inShort": "Armchair 42 is a lounge by Alvar Aalto, from 1932, produced by Artek. A dark shaped plywood seat rests within a pale laminated birch cantilever.",
    "story": [
      [
        "Shape and construction",
        "A dark shaped plywood seat rests within a pale laminated birch cantilever."
      ],
      [
        "The idea in use",
        "The contrast makes the two structural ideas easy to see: the seat holds the body while the bent outer frame supplies support and spring."
      ]
    ],
    "source": "https://www.artek.fi/en/products/armchair-42",
    "expansion": true,
    "added": 42,
    "designer": "alvar-aalto"
  },
  {
    "dept": "furniture",
    "slug": "lounge-chair-43",
    "name": "Lounge Chair 43",
    "year": 1937,
    "type": "Lounge",
    "material": [
      "Wood",
      "Fabric"
    ],
    "materials": "Wood, Fabric",
    "origin": "Finland",
    "status": "In production",
    "manufacturer": "Artek",
    "inShort": "Lounge Chair 43 is a lounge by Alvar Aalto, from 1937, produced by Artek. A long woven reclining surface stretches over continuous curved birch supports.",
    "story": [
      [
        "Shape and construction",
        "A long woven reclining surface stretches over continuous curved birch supports."
      ],
      [
        "The idea in use",
        "The sweeping frame carries the sitter in a low position, with the resilience of the timber replacing a conventional four-leg stance."
      ]
    ],
    "source": "https://www.artek.fi/en/products/lounge-chair-43",
    "expansion": true,
    "added": 39,
    "designer": "alvar-aalto"
  },
  {
    "dept": "furniture",
    "slug": "day-bed-710",
    "name": "Day Bed 710",
    "year": 1933,
    "type": "Sofa",
    "material": [
      "Wood",
      "Fabric"
    ],
    "materials": "Wood, Fabric",
    "origin": "Finland",
    "status": "In production",
    "manufacturer": "Artek",
    "inShort": "Day Bed 710 is a sofa by Alvar Aalto, from 1933, produced by Artek. A slatted timber platform on bent legs supports a simple upholstered mattress.",
    "story": [
      [
        "Shape and construction",
        "A slatted timber platform on bent legs supports a simple upholstered mattress."
      ],
      [
        "The idea in use",
        "The uncomplicated frame makes the piece useful for both sitting and reclining, keeping its character closer to a platform than a bulky sofa."
      ]
    ],
    "source": "https://www.artek.fi/en/products/day-bed-710",
    "expansion": true,
    "added": 37,
    "designer": "alvar-aalto"
  },
  {
    "dept": "furniture",
    "slug": "side-table-606",
    "name": "Side Table 606",
    "year": 1932,
    "type": "Table",
    "material": [
      "Metal",
      "Wood"
    ],
    "materials": "Metal, Wood",
    "origin": "Finland",
    "status": "In production",
    "manufacturer": "Artek",
    "inShort": "Side Table 606 is a table by Aino Aalto, from 1932, produced by Artek. A small plywood top sits above a tubular frame with an open, three-quarter-circle base.",
    "story": [
      [
        "Shape and construction",
        "A small plywood top sits above a tubular frame with an open, three-quarter-circle base."
      ],
      [
        "The idea in use",
        "The gap in the base allows the table to pull close to a chair or bed, putting its useful surface within reach."
      ]
    ],
    "source": "https://www.artek.fi/en/products/side-table-606",
    "expansion": true,
    "added": 35,
    "designer": "aino-aalto"
  },
  {
    "dept": "furniture",
    "slug": "trienna-table",
    "name": "Trienna Table",
    "year": 1954,
    "type": "Table",
    "material": [
      "Wood"
    ],
    "materials": "Wood",
    "origin": "Finland",
    "status": "In production",
    "manufacturer": "Artek",
    "inShort": "Trienna Table is a table by Ilmari Tapiovaara, from 1954, produced by Artek. Three bent plywood sheets form a hexagonal top and three triangular supporting legs.",
    "story": [
      [
        "Shape and construction",
        "Three bent plywood sheets form a hexagonal top and three triangular supporting legs."
      ],
      [
        "The idea in use",
        "Each sheet contributes to both surface and support, so the table reads as a folded volume rather than a top placed on a separate base."
      ]
    ],
    "source": "https://www.artek.fi/en/products/trienna-table",
    "expansion": true,
    "added": 33,
    "designer": "ilmari-tapiovaara"
  },
  {
    "dept": "furniture",
    "slug": "rope-chair",
    "name": "Rope Chair",
    "year": 2020,
    "type": "Chair",
    "material": [
      "Metal",
      "Rope",
      "Wood"
    ],
    "materials": "Metal, Rope, Wood",
    "origin": "France",
    "status": "In production",
    "manufacturer": "Artek",
    "inShort": "Rope Chair is a chair by Ronan & Erwan Bouroullec, from 2020, produced by Artek. A slender metal frame is joined by a soft rope that forms part of the back and arms.",
    "story": [
      [
        "Shape and construction",
        "A slender metal frame is joined by a soft rope that forms part of the back and arms."
      ],
      [
        "The idea in use",
        "Rigid tubing and flexible rope meet at the points of contact, making the contrast between structural line and yielding support explicit."
      ]
    ],
    "source": "https://www.artek.fi/en/products/rope-chair",
    "expansion": true,
    "added": 31,
    "designer": "ronan-erwan-bouroullec"
  },
  {
    "dept": "objects",
    "slug": "9093-kettle",
    "name": "9093",
    "year": 1985,
    "type": "Kitchen",
    "material": [
      "Metal",
      "Plastic"
    ],
    "materials": "Metal, Plastic",
    "origin": "USA",
    "status": "In production",
    "manufacturer": "Alessi",
    "inShort": "9093 is a design object by Michael Graves, from 1985, produced by Alessi. A polished conical kettle combines a coloured arched handle with a bird-shaped whistle.",
    "story": [
      [
        "Shape and construction",
        "A polished conical kettle combines a coloured arched handle with a bird-shaped whistle."
      ],
      [
        "The idea in use",
        "The whistle gives an ordinary boiling signal a small character, placing humour directly within the working parts of the kettle."
      ]
    ],
    "source": "https://eu.alessi.com/products/9093-kettle",
    "expansion": true,
    "added": 128,
    "designer": "michael-graves"
  },
  {
    "dept": "objects",
    "slug": "9090-espresso-coffee-maker",
    "name": "9090",
    "year": 1979,
    "type": "Kitchen",
    "material": [
      "Metal"
    ],
    "materials": "Metal",
    "origin": "Germany",
    "status": "In production",
    "manufacturer": "Alessi",
    "inShort": "9090 is a design object by Richard Sapper, from 1979, produced by Alessi. A stainless-steel espresso maker uses a broad lower chamber and a compact, upright handle.",
    "story": [
      [
        "Shape and construction",
        "A stainless-steel espresso maker uses a broad lower chamber and a compact, upright handle."
      ],
      [
        "The idea in use",
        "Its strong base and carefully shaped pouring lip make the familiar coffee-making sequence visible in the form of the vessel."
      ]
    ],
    "source": "https://eu.alessi.com/products/9090-espresso-coffee-maker",
    "expansion": true,
    "added": 125,
    "designer": "richard-sapper"
  },
  {
    "dept": "objects",
    "slug": "la-conica-espresso-coffee-maker",
    "name": "La conica",
    "year": 1984,
    "type": "Kitchen",
    "material": [
      "Metal"
    ],
    "materials": "Metal",
    "origin": "Italy",
    "status": "In production",
    "manufacturer": "Alessi",
    "inShort": "La conica is a design object by Aldo Rossi, from 1984, produced by Alessi. A cylindrical coffee maker rises to a sharp conical lid above a contrasting copper-coloured base.",
    "story": [
      [
        "Shape and construction",
        "A cylindrical coffee maker rises to a sharp conical lid above a contrasting copper-coloured base."
      ],
      [
        "The idea in use",
        "Simple architectural volumes turn a small kitchen tool into a composition of tower, roof and foundation."
      ]
    ],
    "source": "https://eu.alessi.com/products/la-conica-espresso-coffee-maker",
    "expansion": true,
    "added": 122,
    "designer": "aldo-rossi"
  },
  {
    "dept": "objects",
    "slug": "la-cupola-espresso-coffee-maker",
    "name": "La cupola",
    "year": 1988,
    "type": "Kitchen",
    "material": [
      "Metal",
      "Plastic"
    ],
    "materials": "Metal, Plastic",
    "origin": "Italy",
    "status": "In production",
    "manufacturer": "Alessi",
    "inShort": "La cupola is a design object by Aldo Rossi, from 1988, produced by Alessi. A rounded dome caps an upright coffee maker with a dark side handle.",
    "story": [
      [
        "Shape and construction",
        "A rounded dome caps an upright coffee maker with a dark side handle."
      ],
      [
        "The idea in use",
        "The domed roof gives the vessel a miniature architectural identity while leaving its everyday purpose immediately recognizable."
      ]
    ],
    "source": "https://eu.alessi.com/products/la-cupola-espresso-coffee-maker",
    "expansion": true,
    "added": 119,
    "designer": "aldo-rossi"
  },
  {
    "dept": "objects",
    "slug": "anna-g-corkscrew",
    "name": "Anna G.",
    "year": 1994,
    "type": "Kitchen",
    "material": [
      "Metal"
    ],
    "materials": "Metal",
    "origin": "Italy",
    "status": "In production",
    "manufacturer": "Alessi",
    "inShort": "Anna G. is a design object by Alessandro Mendini, from 1994, produced by Alessi. A smiling face and a skirt-like body turn the two arms of a winged corkscrew into a figure.",
    "story": [
      [
        "Shape and construction",
        "A smiling face and a skirt-like body turn the two arms of a winged corkscrew into a figure."
      ],
      [
        "The idea in use",
        "Its character grows out of the operating mechanism: raising and lowering the arms becomes a small theatrical gesture."
      ]
    ],
    "source": "https://eu.alessi.com/products/anna-g-corkscrew",
    "expansion": true,
    "added": 116,
    "designer": "alessandro-mendini"
  },
  {
    "dept": "objects",
    "slug": "alessandro-m-corkscrew",
    "name": "Alessandro M.",
    "year": 2003,
    "type": "Kitchen",
    "material": [
      "Metal",
      "Plastic"
    ],
    "materials": "Metal, Plastic",
    "origin": "Italy",
    "status": "In production",
    "manufacturer": "Alessi",
    "inShort": "Alessandro M. is a design object by Alessandro Mendini, from 2003, produced by Alessi. A small figure in a hat conceals a corkscrew beneath its cylindrical body.",
    "story": [
      [
        "Shape and construction",
        "A small figure in a hat conceals a corkscrew beneath its cylindrical body."
      ],
      [
        "The idea in use",
        "The object treats opening a bottle as a playful encounter with a character, while keeping the tool compact enough for the hand."
      ]
    ],
    "source": "https://eu.alessi.com/products/alessandro-m-corkscrew",
    "expansion": true,
    "added": 113,
    "designer": "alessandro-mendini"
  },
  {
    "dept": "objects",
    "slug": "nuovo-milano-cutlery-set-24-pieces",
    "name": "Nuovo Milano",
    "year": 1987,
    "type": "Kitchen",
    "material": [
      "Metal"
    ],
    "materials": "Metal",
    "origin": "Italy",
    "status": "In production",
    "manufacturer": "Alessi",
    "inShort": "Nuovo Milano is a design object by Ettore Sottsass & Alberto Gozzi, from 1987, produced by Alessi. Rounded stainless-steel handles give the cutlery a smooth, pebble-like feel.",
    "story": [
      [
        "Shape and construction",
        "Rounded stainless-steel handles give the cutlery a smooth, pebble-like feel."
      ],
      [
        "The idea in use",
        "The transitions between handle and working end are softened, making an everyday place setting feel continuous rather than assembled from abrupt shapes."
      ]
    ],
    "source": "https://eu.alessi.com/products/nuovo-milano-cutlery-set-24-pieces",
    "expansion": true,
    "added": 110,
    "designer": "ettore-sottsass-alberto-gozzi"
  },
  {
    "dept": "objects",
    "slug": "parmenide-grater-with-cheese-cellar",
    "name": "Parmenide",
    "year": 1994,
    "type": "Kitchen",
    "material": [
      "Metal",
      "Plastic"
    ],
    "materials": "Metal, Plastic",
    "origin": "Argentina · Italy",
    "status": "In production",
    "manufacturer": "Alessi",
    "inShort": "Parmenide is a design object by Alejandro Ruiz & CSA, from 1994, produced by Alessi. A small metal grater sits across a curved container that catches the grated cheese.",
    "story": [
      [
        "Shape and construction",
        "A small metal grater sits across a curved container that catches the grated cheese."
      ],
      [
        "The idea in use",
        "Combining preparation and storage reduces the need for a second dish and gives the grater a useful resting place."
      ]
    ],
    "source": "https://eu.alessi.com/products/parmenide-grater-with-cheese-cellar",
    "expansion": true,
    "added": 107,
    "designer": "alejandro-ruiz-csa"
  },
  {
    "dept": "objects",
    "slug": "plisse-electric-kettle-european-plug",
    "name": "Plissé Kettle",
    "year": 2018,
    "type": "Kitchen",
    "material": [
      "Plastic"
    ],
    "materials": "Plastic",
    "origin": "Italy",
    "status": "In production",
    "manufacturer": "Alessi",
    "inShort": "Plissé Kettle is a design object by Michele De Lucchi, from 2018, produced by Alessi. Fine vertical pleats wrap around an electric kettle with a sharply defined spout and handle.",
    "story": [
      [
        "Shape and construction",
        "Fine vertical pleats wrap around an electric kettle with a sharply defined spout and handle."
      ],
      [
        "The idea in use",
        "The repeated folds give a familiar appliance the rhythm of folded fabric, turning the outer shell into its defining surface."
      ]
    ],
    "source": "https://eu.alessi.com/products/plisse-electric-kettle-european-plug",
    "expansion": true,
    "added": 104,
    "designer": "michele-de-lucchi-solo"
  },
  {
    "dept": "objects",
    "slug": "pulcina-espresso-coffee-maker-1",
    "name": "Pulcina",
    "year": 2015,
    "type": "Kitchen",
    "material": [
      "Metal",
      "Plastic"
    ],
    "materials": "Metal, Plastic",
    "origin": "Italy",
    "status": "In production",
    "manufacturer": "Alessi",
    "inShort": "Pulcina is a design object by Michele De Lucchi, from 2015, produced by Alessi. Stepped metal curves build a rounded coffee maker with a dark handle and a pointed pouring spout.",
    "story": [
      [
        "Shape and construction",
        "Stepped metal curves build a rounded coffee maker with a dark handle and a pointed pouring spout."
      ],
      [
        "The idea in use",
        "The ribbed silhouette makes its volume unusually tactile, while the distinct spout gives the otherwise rounded body a clear direction."
      ]
    ],
    "source": "https://eu.alessi.com/products/pulcina-espresso-coffee-maker-1",
    "expansion": true,
    "added": 101,
    "designer": "michele-de-lucchi-solo"
  },
  {
    "dept": "objects",
    "slug": "caffa-travel-mug",
    "name": "Caffa",
    "year": 2019,
    "type": "Kitchen",
    "material": [
      "Metal",
      "Plastic"
    ],
    "materials": "Metal, Plastic",
    "origin": "Italy",
    "status": "In production",
    "manufacturer": "Alessi",
    "inShort": "Caffa is a design object by Giulio Iacchetti, from 2019, produced by Alessi. A tapered steel travel mug is closed by a simple coloured lid.",
    "story": [
      [
        "Shape and construction",
        "A tapered steel travel mug is closed by a simple coloured lid."
      ],
      [
        "The idea in use",
        "The contrasting materials distinguish the insulated vessel from the part handled during drinking, keeping the object visually spare and easy to identify."
      ]
    ],
    "source": "https://www.giulioiacchetti.com/?p=5579",
    "expansion": true,
    "added": 98,
    "designer": "giulio-iacchetti"
  },
  {
    "dept": "objects",
    "slug": "tonale-small-bowl-4-pieces",
    "name": "Tonale Bowl",
    "year": 2009,
    "type": "Kitchen",
    "material": [
      "Ceramic"
    ],
    "materials": "Ceramic",
    "origin": "United Kingdom",
    "status": "In production",
    "manufacturer": "Alessi",
    "inShort": "Tonale Bowl is a design object by David Chipperfield, from 2009, produced by Alessi. A small ceramic bowl uses a softly rounded wall and restrained earthy colour.",
    "story": [
      [
        "Shape and construction",
        "A small ceramic bowl uses a softly rounded wall and restrained earthy colour."
      ],
      [
        "The idea in use",
        "The quiet shape allows the material and the food it holds to remain central, fitting into a coordinated family of everyday tableware."
      ]
    ],
    "source": "https://eu.alessi.com/products/tonale-small-bowl-4-pieces",
    "expansion": true,
    "added": 95,
    "designer": "david-chipperfield"
  },
  {
    "dept": "objects",
    "slug": "mediterraneo-fruit-holder",
    "name": "Mediterraneo",
    "year": 2004,
    "type": "Kitchen",
    "material": [
      "Metal"
    ],
    "materials": "Metal",
    "origin": "Italy",
    "status": "In production",
    "manufacturer": "Alessi",
    "inShort": "Mediterraneo is a design object by Emma Silvestris & LPWK, from 2004, produced by Alessi. Branches cut from sheet metal rise into an open coral-like bowl.",
    "story": [
      [
        "Shape and construction",
        "Branches cut from sheet metal rise into an open coral-like bowl."
      ],
      [
        "The idea in use",
        "The empty spaces are as important as the metal, making a rigid material read as a light network rather than a solid container."
      ]
    ],
    "source": "https://eu.alessi.com/products/mediterraneo-fruit-holder",
    "expansion": true,
    "added": 92,
    "designer": "emma-silvestris-lpwk"
  },
  {
    "dept": "objects",
    "slug": "trinity-fruit-holder",
    "name": "Trinity Fruit Bowl",
    "year": 2015,
    "type": "Kitchen",
    "material": [
      "Metal"
    ],
    "materials": "Metal",
    "origin": "Australia",
    "status": "In production",
    "manufacturer": "Alessi",
    "inShort": "Trinity Fruit Bowl is a design object by Adam Cornish, from 2015, produced by Alessi. A sequence of curved metal ribs spirals around the centre of an open fruit bowl.",
    "story": [
      [
        "Shape and construction",
        "A sequence of curved metal ribs spirals around the centre of an open fruit bowl."
      ],
      [
        "The idea in use",
        "The changing direction of the ribs gives a static container a sense of movement while leaving its contents visible."
      ]
    ],
    "source": "https://eu.alessi.com/products/trinity-fruit-holder",
    "expansion": true,
    "added": 89,
    "designer": "adam-cornish"
  },
  {
    "dept": "objects",
    "slug": "bark-centrepiece",
    "name": "Bark Centrepiece",
    "year": 2015,
    "type": "Kitchen",
    "material": [
      "Metal"
    ],
    "materials": "Metal",
    "origin": "Belgium · Tunisia",
    "status": "In production",
    "manufacturer": "Alessi",
    "inShort": "Bark Centrepiece is a design object by Michel Boucquillon & Donia Maaoui, from 2015, produced by Alessi. A low elongated metal bowl is pierced with an irregular branching pattern.",
    "story": [
      [
        "Shape and construction",
        "A low elongated metal bowl is pierced with an irregular branching pattern."
      ],
      [
        "The idea in use",
        "The perforations lighten the broad surface and translate the texture of bark into an object for the table."
      ]
    ],
    "source": "https://eu.alessi.com/products/bark-centrepiece",
    "expansion": true,
    "added": 86,
    "designer": "michel-boucquillon-donia-maaoui"
  },
  {
    "dept": "objects",
    "slug": "blow-up-citrus-basket",
    "name": "Blow Up Basket",
    "year": 2004,
    "type": "Kitchen",
    "material": [
      "Metal"
    ],
    "materials": "Metal",
    "origin": "Brazil",
    "status": "In production",
    "manufacturer": "Alessi",
    "inShort": "Blow Up Basket is a design object by Fernando & Humberto Campana, from 2004, produced by Alessi. Thin steel rods overlap in a loose-looking cluster to form an open basket.",
    "story": [
      [
        "Shape and construction",
        "Thin steel rods overlap in a loose-looking cluster to form an open basket."
      ],
      [
        "The idea in use",
        "The apparent disorder is held within a useful volume, giving a familiar container the energy of an unfinished construction."
      ]
    ],
    "source": "https://eu.alessi.com/products/blow-up-citrus-basket",
    "expansion": true,
    "added": 83,
    "designer": "fernando-humberto-campana"
  },
  {
    "dept": "objects",
    "slug": "la-stanza-dello-scirocco-wall-clock",
    "name": "La Stanza dello Scirocco Clock",
    "year": 2015,
    "type": "Clock",
    "material": [
      "Metal"
    ],
    "materials": "Metal",
    "origin": "Italy",
    "status": "In production",
    "manufacturer": "Alessi",
    "inShort": "La Stanza dello Scirocco Clock is a design object by Mario Trimarchi, from 2015, produced by Alessi. Irregular metal panels gather around the clock face like fragments caught in a gust.",
    "story": [
      [
        "Shape and construction",
        "Irregular metal panels gather around the clock face like fragments caught in a gust."
      ],
      [
        "The idea in use",
        "The moving-looking perimeter contrasts with the steady hands, turning the idea of passing time into a layered wall composition."
      ]
    ],
    "source": "https://eu.alessi.com/products/la-stanza-dello-scirocco-wall-clock",
    "expansion": true,
    "added": 80,
    "designer": "mario-trimarchi"
  },
  {
    "dept": "objects",
    "slug": "todo-giant-grater",
    "name": "Todo",
    "year": 2004,
    "type": "Kitchen",
    "material": [
      "Metal",
      "Wood"
    ],
    "materials": "Metal, Wood",
    "origin": "Germany",
    "status": "In production",
    "manufacturer": "Alessi",
    "inShort": "Todo is a design object by Richard Sapper, from 2004, produced by Alessi. A tall tapering metal grater ends in a long wooden handle.",
    "story": [
      [
        "Shape and construction",
        "A tall tapering metal grater ends in a long wooden handle."
      ],
      [
        "The idea in use",
        "Its extended cone creates a generous working surface and makes a kitchen tool substantial enough to be placed directly on the dining table."
      ]
    ],
    "source": "https://eu.alessi.com/products/todo-giant-grater",
    "expansion": true,
    "added": 77,
    "designer": "richard-sapper"
  },
  {
    "dept": "objects",
    "slug": "5070-condiment-set",
    "name": "5070",
    "year": 1978,
    "type": "Kitchen",
    "material": [
      "Metal",
      "Glass"
    ],
    "materials": "Metal, Glass",
    "origin": "Italy",
    "status": "In production",
    "manufacturer": "Alessi",
    "inShort": "5070 is a design object by Ettore Sottsass, from 1978, produced by Alessi. Glass containers for oil, vinegar, salt and pepper sit within a compact metal carrier.",
    "story": [
      [
        "Shape and construction",
        "Glass containers for oil, vinegar, salt and pepper sit within a compact metal carrier."
      ],
      [
        "The idea in use",
        "The shared base gathers several small tools into one portable arrangement, balancing transparent vessels with a clearly outlined frame."
      ]
    ],
    "source": "https://eu.alessi.com/products/5070-condiment-set",
    "expansion": true,
    "added": 74,
    "designer": "ettore-sottsass"
  },
  {
    "dept": "objects",
    "slug": "5071-parmesan-cheese-cellar",
    "name": "5071",
    "year": 1978,
    "type": "Kitchen",
    "material": [
      "Metal",
      "Glass"
    ],
    "materials": "Metal, Glass",
    "origin": "Italy",
    "status": "In production",
    "manufacturer": "Alessi",
    "inShort": "5071 is a design object by Ettore Sottsass, from 1978, produced by Alessi. A glass cheese container rests inside a polished steel holder with a fitted lid and spoon.",
    "story": [
      [
        "Shape and construction",
        "A glass cheese container rests inside a polished steel holder with a fitted lid and spoon."
      ],
      [
        "The idea in use",
        "The contrasting materials keep the contents visible while giving the vessel a durable edge and a defined place in a table setting."
      ]
    ],
    "source": "https://eu.alessi.com/products/5071-parmesan-cheese-cellar",
    "expansion": true,
    "added": 71,
    "designer": "ettore-sottsass"
  },
  {
    "dept": "objects",
    "slug": "9097-sugar-bowl-with-spoon",
    "name": "9097",
    "year": 1988,
    "type": "Kitchen",
    "material": [
      "Metal",
      "Plastic"
    ],
    "materials": "Metal, Plastic",
    "origin": "USA",
    "status": "In production",
    "manufacturer": "Alessi",
    "inShort": "9097 is a design object by Michael Graves, from 1988, produced by Alessi. A rounded polished sugar bowl has small coloured handles and a matching spoon.",
    "story": [
      [
        "Shape and construction",
        "A rounded polished sugar bowl has small coloured handles and a matching spoon."
      ],
      [
        "The idea in use",
        "The miniature handles and spherical details give the vessel a character that links it to the broader Graves tableware family."
      ]
    ],
    "source": "https://eu.alessi.com/products/9097-sugar-bowl-with-spoon",
    "expansion": true,
    "added": 68,
    "designer": "michael-graves"
  },
  {
    "dept": "objects",
    "slug": "9098-pepper-mill",
    "name": "9098",
    "year": 1988,
    "type": "Kitchen",
    "material": [
      "Metal",
      "Plastic"
    ],
    "materials": "Metal, Plastic",
    "origin": "USA",
    "status": "In production",
    "manufacturer": "Alessi",
    "inShort": "9098 is a design object by Michael Graves, from 1988, produced by Alessi. A cylindrical metal pepper mill is topped by a coloured wing-like turning piece.",
    "story": [
      [
        "Shape and construction",
        "A cylindrical metal pepper mill is topped by a coloured wing-like turning piece."
      ],
      [
        "The idea in use",
        "The enlarged top makes the grinding action legible, allowing a functional grip to become the strongest visual feature."
      ]
    ],
    "source": "https://eu.alessi.com/products/9098-pepper-mill",
    "expansion": true,
    "added": 65,
    "designer": "michael-graves"
  },
  {
    "dept": "objects",
    "slug": "mami-pitcher",
    "name": "Mami Pitcher",
    "year": 2003,
    "type": "Kitchen",
    "material": [
      "Glass"
    ],
    "materials": "Glass",
    "origin": "Italy",
    "status": "In production",
    "manufacturer": "Alessi",
    "inShort": "Mami Pitcher is a design object by Stefano Giovannoni, from 2003, produced by Alessi. A clear glass pitcher narrows at the waist before opening into a simple pouring rim.",
    "story": [
      [
        "Shape and construction",
        "A clear glass pitcher narrows at the waist before opening into a simple pouring rim."
      ],
      [
        "The idea in use",
        "The soft outline avoids extra handles or decoration, letting the thickness and transparency of the glass define the vessel."
      ]
    ],
    "source": "https://eu.alessi.com/products/mami-pitcher",
    "expansion": true,
    "added": 62,
    "designer": "stefano-giovannoni"
  },
  {
    "dept": "objects",
    "slug": "tigrito-cat-bowl",
    "name": "Tigrito",
    "year": 2005,
    "type": "Kitchen",
    "material": [
      "Metal",
      "Plastic"
    ],
    "materials": "Metal, Plastic",
    "origin": "Italy",
    "status": "In production",
    "manufacturer": "Alessi",
    "inShort": "Tigrito is a design object by Miriam Mirri, from 2005, produced by Alessi. Two removable metal bowls sit on either side of a small cat-shaped central handle.",
    "story": [
      [
        "Shape and construction",
        "Two removable metal bowls sit on either side of a small cat-shaped central handle."
      ],
      [
        "The idea in use",
        "The raised tail gives the bowls a convenient carrying point, bringing a playful character into an ordinary feeding routine."
      ]
    ],
    "source": "https://eu.alessi.com/products/tigrito-cat-bowl",
    "expansion": true,
    "added": 59,
    "designer": "miriam-mirri"
  },
  {
    "dept": "objects",
    "slug": "girotondo-round-tray",
    "name": "Girotondo Tray",
    "year": 1989,
    "type": "Kitchen",
    "material": [
      "Metal"
    ],
    "materials": "Metal",
    "origin": "Italy",
    "status": "In production",
    "manufacturer": "Alessi",
    "inShort": "Girotondo Tray is a design object by Stefano Giovannoni & Guido Venturini, from 1989, produced by Alessi. A polished circular tray has a raised rim cut with a repeating paper-doll motif.",
    "story": [
      [
        "Shape and construction",
        "A polished circular tray has a raised rim cut with a repeating paper-doll motif."
      ],
      [
        "The idea in use",
        "The cutouts bring a familiar chain of figures into the metal edge, turning a retaining border into an immediately recognizable pattern."
      ]
    ],
    "source": "https://eu.alessi.com/products/girotondo-round-tray",
    "expansion": true,
    "added": 56,
    "designer": "stefano-giovannoni-guido-venturini"
  },
  {
    "dept": "objects",
    "slug": "ossidiana-espresso-coffee-maker",
    "name": "Ossidiana",
    "year": 2014,
    "type": "Kitchen",
    "material": [
      "Metal",
      "Plastic"
    ],
    "materials": "Metal, Plastic",
    "origin": "Italy",
    "status": "In production",
    "manufacturer": "Alessi",
    "inShort": "Ossidiana is a design object by Mario Trimarchi, from 2014, produced by Alessi. Angular cuts interrupt the body of a metal espresso maker, giving it a stone-like faceted outline.",
    "story": [
      [
        "Shape and construction",
        "Angular cuts interrupt the body of a metal espresso maker, giving it a stone-like faceted outline."
      ],
      [
        "The idea in use",
        "The facets catch light differently as the vessel turns, connecting its name to the appearance of chipped volcanic glass."
      ]
    ],
    "source": "https://eu.alessi.com/products/ossidiana-espresso-coffee-maker",
    "expansion": true,
    "added": 53,
    "designer": "mario-trimarchi"
  },
  {
    "dept": "objects",
    "slug": "moka-espresso-coffee-maker",
    "name": "Moka",
    "year": 2019,
    "type": "Kitchen",
    "material": [
      "Metal",
      "Plastic"
    ],
    "materials": "Metal, Plastic",
    "origin": "United Kingdom",
    "status": "In production",
    "manufacturer": "Alessi",
    "inShort": "Moka is a design object by David Chipperfield, from 2019, produced by Alessi. A faceted aluminium coffee maker has a flat-topped lid and a precisely shaped handle.",
    "story": [
      [
        "Shape and construction",
        "A faceted aluminium coffee maker has a flat-topped lid and a precisely shaped handle."
      ],
      [
        "The idea in use",
        "Its restrained revisions keep the familiar moka-pot type recognizable while sharpening the relationship between body, lid and grip."
      ]
    ],
    "source": "https://eu.alessi.com/products/moka-espresso-coffee-maker",
    "expansion": true,
    "added": 50,
    "designer": "david-chipperfield"
  },
  {
    "dept": "objects",
    "slug": "sg63-electric-citrus-juicer-european-plug",
    "name": "SG63 Citrus Juicer",
    "year": 2003,
    "type": "Kitchen",
    "material": [
      "Metal",
      "Plastic"
    ],
    "materials": "Metal, Plastic",
    "origin": "Italy",
    "status": "In production",
    "manufacturer": "Alessi",
    "inShort": "SG63 Citrus Juicer is a design object by Stefano Giovannoni, from 2003, produced by Alessi. A rounded polished body supports a clear upper cover and a compact citrus-pressing mechanism.",
    "story": [
      [
        "Shape and construction",
        "A rounded polished body supports a clear upper cover and a compact citrus-pressing mechanism."
      ],
      [
        "The idea in use",
        "The continuous shell gives an electrical kitchen tool a clear, contained outline, while the transparent top keeps its working area visible."
      ]
    ],
    "source": "https://eu.alessi.com/products/sg63-electric-citrus-juicer-european-plug",
    "expansion": true,
    "added": 47,
    "designer": "stefano-giovannoni"
  },
  {
    "dept": "objects",
    "slug": "la-bella-tavola-soup-bowl",
    "name": "La Bella Tavola Bowl",
    "year": 1993,
    "type": "Kitchen",
    "material": [
      "Ceramic"
    ],
    "materials": "Ceramic",
    "origin": "Italy",
    "status": "In production",
    "manufacturer": "Alessi",
    "inShort": "La Bella Tavola Bowl is a design object by Ettore Sottsass, from 1993, produced by Alessi. A broad white porcelain rim surrounds a shallow bowl with a slim outer profile.",
    "story": [
      [
        "Shape and construction",
        "A broad white porcelain rim surrounds a shallow bowl with a slim outer profile."
      ],
      [
        "The idea in use",
        "The generous border frames the food like a small architectural surface, using proportion instead of applied decoration to create character."
      ],
      [
        "An original returned",
        "The porcelain service was designed in 1993. Alessi reissued the collection in 2026, retaining its broad rims and spare white surfaces."
      ]
    ],
    "source": "https://eu.alessi.com/products/la-bella-tavola-soup-bowl",
    "expansion": true,
    "added": 44,
    "designer": "ettore-sottsass"
  },
  {
    "dept": "objects",
    "slug": "bulla-bottle-opener",
    "name": "Bulla",
    "year": 2015,
    "type": "Kitchen",
    "material": [
      "Metal"
    ],
    "materials": "Metal",
    "origin": "Italy",
    "status": "In production",
    "manufacturer": "Alessi",
    "inShort": "Bulla is a design object by Valerio Sommella, from 2015, produced by Alessi. A compact polished bottle opener folds a curved shell-like shape around its working opening.",
    "story": [
      [
        "Shape and construction",
        "A compact polished bottle opener folds a curved shell-like shape around its working opening."
      ],
      [
        "The idea in use",
        "Its smooth external form is comfortable to hold, while the opening gives a small sculptural object a clear practical role."
      ]
    ],
    "source": "https://eu.alessi.com/products/bulla-bottle-opener",
    "expansion": true,
    "added": 41,
    "designer": "valerio-sommella"
  }
];
  OBJECTS = OBJECTS.concat(ADDITIONAL_OBJECTS);
  OBJECTS.forEach(function (o) { if (!o.yearLabel) o.yearLabel = String(o.year); o.era = o.year < 1900 ? '1850s' : Math.floor(o.year / 10) * 10 + 's'; });
  var oBySlug = {}; OBJECTS.forEach(function (o) { oBySlug[o.slug] = o; });

  var STORIES = [
    { slug: 'danish-light', title: 'Danish light: why glare became a design problem', min: 6, date: 'October 2026', featured: ['ph-5', 'panthella'],
      lede: 'How a handful of Danish designers turned a technical nuisance into an aesthetic.',
      inShort: 'Early electric bulbs were harsh and glaring. Danish designers such as Poul Henningsen answered with lamps that hide the light source and spread a soft, even glow. The idea still shapes how many people light their homes today.',
      sections: [['The trouble with the bare bulb', ['When electric light reached ordinary homes, it brought a new problem with it. A bare bulb is bright at its centre and dark everywhere else, so the eye keeps adjusting between glare and shadow.', 'In Denmark, the architect and critic Poul Henningsen made this his life’s question. He argued that good light was a matter of comfort, not only of brightness.']],
        ['From shades to a whole aesthetic', ['Henningsen’s layered shades hid the bulb from every angle. His PH 5 of 1958 became the best-known version of the idea.', 'A generation later, Verner Panton’s Panthella of 1971, also made by Louis Poulsen, softened the same principle into a rounded, sculptural form.']]],
      highlight: 'The goal was never a brighter room, only a calmer one.',
      faq: [['What is glare-free lighting?', 'Lighting in which the light source is shielded so it cannot be seen directly. The light reaches the room only after it has been reflected or diffused, which reduces harsh contrast.'], ['Is the PH 5 still produced?', 'Yes. Louis Poulsen still produces the PH 5, first introduced in 1958.'], ['Who designed the Panthella?', 'Verner Panton designed the Panthella in 1971 for Louis Poulsen.']] },
    { slug: 'bent-not-carved', title: 'Bent, not carved: how new techniques made new chairs', min: 5, date: 'October 2026', featured: ['thonet-no-14', 'wassily-chair', 'paimio-chair'],
      lede: 'Steam, steel and plywood: three materials that changed the shape of the chair.',
      inShort: 'Many classic chairs began as experiments with bending. Thonet bent solid beech with steam, Breuer bent steel tubes and Aalto bent plywood. Each technique led to forms that could not have been carved or joined.',
      sections: [['Steam and beech', ['In the 1850s Michael Thonet found a way to bend solid wood with steam. His No. 14 chair needed only a few parts and could be shipped flat.']],
        ['Steel and plywood', ['In 1925 Marcel Breuer built a chair from bent steel tubes. A few years later Alvar Aalto answered with bent birch plywood, which he found warmer to the touch.']]],
      highlight: 'A new way of bending was often the beginning of a new chair.',
      faq: [['What is bentwood furniture?', 'Furniture made from wood that is softened with steam and bent into curves, instead of being carved or joined at angles.'], ['Why did Aalto prefer wood to steel?', 'He found bent wood warmer and more human to touch than tubular steel.']] },
    { slug: 'akari-paper-light', title: 'Paper and light: the story of Akari', min: 4, date: 'October 2026', featured: ['akari-1a', 'noguchi-table'],
      lede: 'How lanterns from a Japanese river town became a modern classic.',
      inShort: 'In 1951 Isamu Noguchi visited Gifu, a Japanese town known for paper lanterns. He turned the craft into Akari, a series of washi-paper lamps that brought a soft, weightless light into modern homes.',
      sections: [['A visit to Gifu', ['Noguchi visited Gifu in 1951 and saw in its lanterns a way of making light that felt both traditional and new.']],
        ['Sculpture for everyday use', ['For Noguchi, a lamp or a table could be a sculpture that people also use. Akari and his glass-topped coffee table share that idea.']]],
      highlight: 'Paper does not hide the light. It slows it down.',
      faq: [['What does Akari mean?', 'Akari is a Japanese word for light.'], ['What are Akari lamps made of?', 'Washi paper stretched over a frame of bamboo ribs, with a metal stand or fitting.']] },
    { slug: 'arco-over-the-table', title: 'Arco: a pendant that stands on the floor', min: 4, date: 'October 2026', featured: ['arco', 'taccia'],
      lede: 'Why the Castiglioni brothers built a lamp that reaches across the room.',
      inShort: 'The Arco, designed by Achille and Pier Giacomo Castiglioni in 1962, gives a dining table the light of a pendant without a ceiling fixture. A steel arc rises from a marble base and bends over the table.',
      sections: [['A practical question', ['How do you hang a light over a table that is not under a ceiling outlet? Instead of moving the table, the Castiglionis moved the light.']],
        ['Engineering as form', ['The arc, the weight of the base and the adjustable stem are all visible. Nothing is hidden, and that honesty is part of the lamp’s appeal.']]],
      highlight: 'Instead of moving the table, they moved the light.',
      faq: [['Who makes the Arco?', 'The Italian company Flos, which has produced it since 1962.'], ['Why does the base have a hole?', 'The hole lets two people pass a broom handle through the heavy marble base and lift it together.']] }
  ];
  var sBySlug = {}; STORIES.forEach(function (s) { sBySlug[s.slug] = s; });

  /* A designer gets a profile once there are two objects or a story featuring them (rule 6.33). */
  DESIGNERS.forEach(function (d) {
    var n = OBJECTS.filter(function (o) { return o.designer === d.id; }).length;
    d.count = n;
    d.page = !!d.inShort && n >= 2;
  });
