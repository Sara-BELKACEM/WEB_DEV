@extends('layouts.app')
@section('content')
<div class="container">
  <h2>Ajouter un employé</h2>
  <form action="{{ route('employees.store') }}" method="POST">
    @csrf
    @include('employees.form')
    <button class="btn btn-success">Ajouter</button>
  </form>
</div>
@endsection
