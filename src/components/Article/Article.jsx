const Article = ({ title }, { url }) => {
  return (
    <div>
      <a href={url}>
        <h4>{title}</h4>
      </a>
      <p>{url}</p>
    </div>
  );
};

export default Article;
