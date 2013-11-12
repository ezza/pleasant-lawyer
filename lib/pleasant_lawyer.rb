class PleasantLawyer

  ADJECTIVES = File.read(File.expand_path('../../adjectives.txt', __FILE__)).split("\n")
  NOUNS = File.read(File.expand_path('../../nouns.txt', __FILE__)).split("\n")
  WORD_LIST_SIZE = NOUNS.length

  def self.convert(text)
    if text.to_i > 0
      number_to_words text.to_i
    else
      words_to_number *text.downcase.split(' ')
    end
  end

  def self.number_to_words(n)
    div, mod = (n-1).divmod(WORD_LIST_SIZE)
    numbers = [mod, (mod + div) % WORD_LIST_SIZE]
    [ADJECTIVES[numbers[0]], NOUNS[numbers[1]]]
  end

  def self.words_to_number(adjective, noun)
    adjective_index = ADJECTIVES.index{|word| word[0..2] == adjective[0..2]}
    noun_index = NOUNS.index{|word| word[0..2] == noun[0..2]}
    return 0 unless noun_index && adjective_index
    ((noun_index - adjective_index) % WORD_LIST_SIZE ) * WORD_LIST_SIZE + adjective_index + 1
  end

end
