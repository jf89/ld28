#!/usr/bin/python

from PIL import Image

tileset = [
	'empty.png',
	'background.png',
	'background-n.png',
	'background-e.png',
	'background-s.png',
	'background-w.png',
	'background-nw.png',
	'background-ne.png',
	'background-se.png',
	'background-sw.png',
	'background-cnw.png',
	'background-cne.png',
	'background-cse.png',
	'background-csw.png',
]

tileset = map(Image.open, tileset)
output = Image.new('RGBA', (len(tileset) * 32, 32))

for i in xrange(len(tileset)):
	output.paste(tileset[i], (i * 32, 0))

output.save('tileset.png')
