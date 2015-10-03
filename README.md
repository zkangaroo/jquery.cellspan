# jquery.cellspan
HTMLテーブルのセルを結合/分割します。

## Installation
```html
<script src="/path/to/jquery.cellspan.js"></script>
```

## Usage
```javascript
table = $.cellspan(target);
table.expand();    // 結合
table.partition(); // 分割
```

## Options
| name		| type		| default	| description	|
|:-			|:-			|:-			|:-				|
| priority	| string	| 'row'		| 結合時の縦/横の優先<br>'row' 縦を優先<br>'col' 横を優先	|

## Method
### .expand([priority])
隣接する空白行を結合

### .partition()
結合セルを分割
