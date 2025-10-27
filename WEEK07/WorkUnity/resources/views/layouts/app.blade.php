<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <title>WorkUnity</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>
    <nav class="navbar navbar-light bg-light mb-4">
        <div class="container">
            <a class="navbar-brand" href="{{ route('employees.index') }}">WorkUnity</a>
        </div>
    </nav>
    @yield('content')
</body>

</html>
