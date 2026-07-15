using Application.Profiles.Commands;
using FluentValidation;

namespace Application.Profiles.Validators;

public class EditProfileValidator : AbstractValidator<EditProfile.Command>
{
    public EditProfileValidator()
    {
        RuleFor(x => x.Profile.DisplayName).NotEmpty().WithMessage("Display Name is required").MaximumLength(100);
        RuleFor(x => x.Profile.Bio).MaximumLength(1000);
    }
}
