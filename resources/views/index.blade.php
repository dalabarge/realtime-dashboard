<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Realtime Dashboards With Async PHP</title>
        <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    </head>
    <body>
        <div id="app" v-cloak>
          <div class="container">
            <intro></intro>
          </div>
        </div>
        <script>
          window.Laravel = {};
          window.Laravel.csrfToken = '{{ csrf_token() }}';
      </script>
      <script src="{{ mix('js/app.js') }}"></script>
    </body>
</html>
