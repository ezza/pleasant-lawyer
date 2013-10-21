ADJECTIVES = File.read('adjectives.txt').split("\n")
NOUNS = File.read('nouns.txt').split("\n")
WORD_LIST_SIZE = NOUNS.length

raise 'adjective and noun counts must be equal' unless NOUNS.length == ADJECTIVES.length

def number_to_words(n)
  div, mod = (n-1).divmod(WORD_LIST_SIZE)
  numbers = [mod, (mod + div) % WORD_LIST_SIZE]
  [ADJECTIVES[numbers[0]], NOUNS[numbers[1]]]
end

(1..WORD_LIST_SIZE**2).each do |i|
  puts number_to_words(i).join(' ')
end
