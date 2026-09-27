--[[ Generates a .bak exactly as the plug-in would, for the ZineIt contract test
     in tests/run-tests.js. Run from the repo root:
       lua5.4 lightroom/tests/make-fixture.lua                                 ]]

package.path = 'lightroom/zineit.lrplugin/?.lua;' .. package.path
local Project = require 'ZineItProject'

local b64 = dofile('lightroom/tests/b64.lua')
local function readFile(p) local f = assert(io.open(p, 'rb')); local d = f:read('a'); f:close(); return d end

local JPG = 'lightroom/tests/fixtures/pixel.jpg'
Project.resetIds()

-- mirrors a real export: 5 selected photos, cover photo, title, captions from IPTC
local photos, files = {}, {}
local captions = { 'Dawn over Kibera, 2026', nil, 'Market day', nil, 'Last light' }
for i = 1, 5 do
  photos[i] = { assetId = 'lra' .. i, name = 'DSC_000' .. i .. '.jpg', w = 6000, h = 4000, caption = captions[i] }
  files[i]  = { assetId = 'lra' .. i, path = JPG, mime = 'image/jpeg' }
end

local project, info = Project.build {
  name = 'Kibera Stories', format = 'mini-zine', margin = 0.25,
  coverPhoto = true, titleOnCover = true, photos = photos,
  timestamp = '2026-07-07T09:00:00.000Z',
}
local ok, err = Project.writeBak('lightroom/tests/fixtures/lightroom-export.bak', project, files, readFile, b64)
assert(ok, err)
print(string.format('fixture written — %d photos placed across %d pages', info.placed, info.pages))
