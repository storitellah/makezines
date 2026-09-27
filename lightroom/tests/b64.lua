--[[ A correct base64 encoder for the plug-in test fixtures.

     The plug-in itself uses Adobe's LrStringUtils.encodeBase64; this exists so
     the tests can produce byte-identical .bak files outside Lightroom.

     Note: the widespread `data:gsub('...', ...)` one-liner is WRONG — it only
     matches complete 3-byte groups and silently drops the remainder, emitting
     raw bytes where padding should be. This implementation handles the tail.  ]]

local B = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
local function ch(v) return B:sub(v + 1, v + 1) end

return function(data)
  local out, n, i = {}, #data, 1
  while i + 2 <= n do
    local a, b, c = data:byte(i, i + 2)
    local v = a * 65536 + b * 256 + c
    out[#out + 1] = ch(v >> 18) .. ch((v >> 12) & 63) .. ch((v >> 6) & 63) .. ch(v & 63)
    i = i + 3
  end
  local rem = n - i + 1
  if rem == 1 then
    local v = data:byte(i) * 65536
    out[#out + 1] = ch(v >> 18) .. ch((v >> 12) & 63) .. '=='
  elseif rem == 2 then
    local a, b = data:byte(i, i + 1)
    local v = a * 65536 + b * 256
    out[#out + 1] = ch(v >> 18) .. ch((v >> 12) & 63) .. ch((v >> 6) & 63) .. '='
  end
  return table.concat(out)
end
