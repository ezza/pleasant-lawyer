ADJECTIVES = File.read('adjectives.txt').split("\n")
NOUNS = File.read('nouns.txt').split("\n")
WORD_LIST_SIZE = NOUNS.length

raise 'adjective and noun counts must be equal' unless NOUNS.length == ADJECTIVES.length

def number_to_words(n)
  div, mod = (n-1).divmod(WORD_LIST_SIZE)
  numbers = [mod, (mod + div) % WORD_LIST_SIZE]
  [ADJECTIVES[numbers[0]], NOUNS[numbers[1]]]
end

def words_to_number(adjective, noun)
  adjective_index = ADJECTIVES.index{|word| word[0..2] == adjective[0..2]}
  noun_index = NOUNS.index{|word| word[0..2] == noun[0..2]}
  ((noun_index - adjective_index) % WORD_LIST_SIZE ) * WORD_LIST_SIZE + adjective_index + 1
end

(1..WORD_LIST_SIZE**2).each do |i|
  puts "#{i} | " + number_to_words(i).join(' ') + " | " + words_to_number(*number_to_words(i)).to_s
  raise 'fail!' unless i == words_to_number(*number_to_words(i))
end
