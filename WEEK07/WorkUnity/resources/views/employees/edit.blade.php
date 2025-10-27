@extends('layouts.app')
@section('content')
<div class="container">
  <h2>Modifier un employé</h2>
  <form action="{{ route('employees.update', $employee) }}" method="POST">
    @csrf @method('PUT')
    @include('employees.form')
    <button class="btn btn-success">Mettre à jour</button>
  </form>
</div>
@endsection
