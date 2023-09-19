const ExternalUnit = () => {
  return (
    <div className="block-unit">
      {Array(4)
        .fill(null)
        .map((_, index) => (
          <script
            key={index}
            dangerouslySetInnerHTML={{
              __html: `atOptions = {
				'key': '471ba32b3bc97c7848935b3e85989bc6',
				'format': 'iframe',
				'height': 50,
				'width': 320,
				'params': {}
			  };
			  document.write('<scr' + 'ipt type="text/javascript" src="//www.profitablecreativeformat.com/471ba32b3bc97c7848935b3e85989bc6/invoke.js"></scr' + 'ipt>');`,
            }}
          />
        ))}
    </div>
  );
};

export default ExternalUnit;
