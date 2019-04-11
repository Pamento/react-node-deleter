# License
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](/LICENSE)


  } else {
    const fontFamily = style.fontFamily || 'Arial',
      fontSize = style.fontSize || 16,
      lineHeight = style.lineHeight || null,
      letterSpacing = style.letterSpacing || 0,
      wordSpacing = style.wordSpacing || 4;
    args = ['-jar', converter,
      '-f', to,
      '-Dfn', fontFamily,
      '-Dfs', fontSize,
      '-Dil', lineHeight,
      '-Dls', letterSpacing,
      '-Dws', wordSpacing,
      '-i', file,
      '-o', output,
    ];
    console.log('args :\n',args);
  }