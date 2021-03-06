const PRELOADER_BG = '#131313';

export const hideBodyCss = `
  body::before {
    content: '';
    display: block;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 99999;
    background-color: ${PRELOADER_BG};
  }
  
  .render body::before {
    display: none;
  }
`;

const noscriptCSS = `
  body::before {
    content: none
  }
`;

export function NoPageFlicker() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: hideBodyCss }} />
      <noscript>
        <style dangerouslySetInnerHTML={{ __html: noscriptCSS }} />
      </noscript>
    </>
  );
}