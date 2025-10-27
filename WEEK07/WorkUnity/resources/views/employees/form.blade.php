@if ($errors->any())
    <div class="alert alert-danger">
        <ul class="mb-0">
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif

<div class="mb-3">
    <input type="text" name="first_name" value="{{ old('first_name', $employee->first_name ?? '') }}"
        class="form-control" placeholder="Prénom">
</div>

<div class="mb-3">
    <input type="text" name="last_name" value="{{ old('last_name', $employee->last_name ?? '') }}"
        class="form-control" placeholder="Nom">
</div>

<div class="mb-3">
    <input type="email" name="email" value="{{ old('email', $employee->email ?? '') }}" class="form-control"
        placeholder="Email">
</div>

<div class="mb-3">
    <input type="text" name="position" value="{{ old('position', $employee->position ?? '') }}" class="form-control"
        placeholder="Poste">
</div>
