import { useState, useEffect } from 'react';
import beautify from 'js-beautify';
import projects from '../../assets/projects.js'
import './Componenter.css'

const Componenter = ({ exclusions }) => {
  const [currentHtml, setHtml] = useState('');
  const [currentStyle, setStyles] = useState('');

  // get the html/style for the current page and set state
  const htmlContent = () => {
    const body = document.querySelector('body');
    const htmlContent = body ? body.innerHTML : '';
    const cssStyles = document.documentElement.innerHTML;

    const cleanedHtml = cleanHtml(htmlContent, exclusions);
    const cleanedStyles = cleanStyles(cssStyles)
    
    setHtml(cleanedHtml);
    setStyles(cleanedStyles);
  };

  // format html for display (breaks/indentation)
  const formatHtml = (html) => {
    return beautify.html(html, {
      indent_size: 2,
      wrap_line_length: 80,
      max_preserve_newlines: 1,
    });
  };

  // clean html of exclusions exclusions:
  // if an element className includes 'exclude'
  // the element and it's content are excluded from output
  const cleanHtml = (html) => {
    const regexExcludeClass = /<[^>]*\sclass\s*=\s*['"]([^'"]*exclude[^'"]*)['"][^>]*>[\s\S]*?<\/[^>]*>/g;
    const cleanedHtml = html.replace(regexExcludeClass, '');
    const scriptIndex = cleanedHtml.lastIndexOf('<script');

    return formatHtml(cleanedHtml.substring(0, scriptIndex));
  };

  // exclude non <style> data and remove comments
  const cleanStyles = (css) => {
    const styleRegex = /<style\b[^>]*>(.*?)<\/style>/gs;
    const matches = css.match(styleRegex);
  
    if (matches) {
      const cleanedMatches = matches.map(match => match.replace(/\/\*[\s\S]*?\*\//g, ''));
      return cleanedMatches;
    }
  
    return null;
  };
  

  // user instruction for AI
  const userRequest = `create a dropdown with 3 options`


  // make api request with updated state data
  const handleRequest = () => {
    console.log(baseRequest, userRequest, currentHtml)
  }

  useEffect(() => {
    htmlContent()
  }, []);

  return (
    <>
      {/* create the display window */}
      <div id="content-creator">
        <div>
          <input type="text"></input>
          <button>Generate</button>
        </div>
        <pre>
          {currentHtml ? currentHtml : ''}
          {currentStyle ? currentStyle : ''}
        </pre>
      </div>

    </>
  );
};

export default Componenter;
