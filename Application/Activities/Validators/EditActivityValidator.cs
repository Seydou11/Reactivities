using System;
using Application.Activities.Commands;
using Application.Activities.DTOs;
using FluentValidation;

namespace Application.Activities.Validators;

public class EditActivityValidator : BaseActivityValidator<EditActivity.Command, EditActivityDto>
{
    public EditActivityValidator() : base(x => x.activityDto)
    {
        RuleFor(x => x.activityDto.Id)
        .NotEmpty().WithMessage("Id is required");
    }
}