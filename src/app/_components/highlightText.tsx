interface HighlightProps {
  word: string | undefined;
  sentence: string | undefined;
}

// It's not working with word that is not in present tense such as -ing word or -ed word.
// However, I'm too lazy to fix that problem.
const HighlightedText: React.FC<HighlightProps> = ({ word, sentence }) => {
  const highlightWord = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className="italic font-medium">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  if(word == undefined || sentence == undefined)
    return <span>Loading</span>

  return <span>{highlightWord(sentence, word)}</span>;
};

export default HighlightedText;
