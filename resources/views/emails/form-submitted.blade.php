<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    <title>ЛетягинЪ · Новая заявка</title>
    <style>
        body { font-family: Georgia, serif; color: #3A1B1C; background: #F5F1EC; padding: 24px; }
        .container { max-width: 640px; margin: 0 auto; background: #fff; border: 1px solid #CFC6BB; }
        .header { background: #3A1B1C; color: #F5F1EC; padding: 24px 32px; }
        .header h1 { margin: 0 0 4px; font-size: 22px; }
        .header .sub { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; opacity: 0.7; }
        .body { padding: 32px; }
        .field { padding: 12px 0; border-bottom: 1px solid #CFC6BB; }
        .field:last-child { border-bottom: 0; }
        .label { font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; color: #635729; margin-bottom: 4px; }
        .value { font-size: 15px; color: #1A1817; }
        .meta { font-size: 11px; color: #8A7E6E; padding: 16px 32px; background: #EBE1CD; text-align: center; letter-spacing: 1px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="sub">Заявка с сайта · {{ $submittedAt }}</div>
            <h1>{{ $formType }} · #{{ $record->id }}</h1>
        </div>

        <div class="body">
            @foreach ($fields as $label => $value)
                @if ($value !== null && $value !== '')
                    <div class="field">
                        <div class="label">{{ $label }}</div>
                        <div class="value">{{ $value }}</div>
                    </div>
                @endif
            @endforeach
        </div>

        <div class="meta">
            letyaginhotel.com · Самара · ул. Самарская, 69
        </div>
    </div>
</body>
</html>
