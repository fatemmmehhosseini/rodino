export type EventValidationErrors = {
  title?: string;
  description?: string;
  subCategory?: string;
  salesStartAt?: string;
  salesEndAt?: string;
  cityId?: string;
  eventVenues?: string;
  venueId?: string;
  price?: string;
};

export function validateEventForm(form: {
  title: string;
  description: string;
  subCategory: string;
  salesStartAt: string;
  salesEndAt: string;
  cityId: string;
  eventVenues: string;
  venueId: string;
  isFree: boolean;
  price: string;
}): EventValidationErrors {
  const errors: EventValidationErrors = {};

  if (!form.title.trim()) {
    errors.title = "عنوان رویداد را وارد کنید.";
  }

  if (!form.description.trim()) {
    errors.description = "توضیحات رویداد را وارد کنید.";
  }

  if (!form.subCategory.trim()) {
    errors.subCategory = "نوع رویداد را مشخص کنید.";
  }

  if (!form.salesStartAt) {
    errors.salesStartAt = "تاریخ شروع فروش را وارد کنید.";
  }

  if (!form.salesEndAt) {
    errors.salesEndAt = "تاریخ پایان فروش را وارد کنید.";
  }

  if (form.salesStartAt && form.salesEndAt) {
    const startDate = new Date(form.salesStartAt);
    const endDate = new Date(form.salesEndAt);

    if (endDate < startDate) {
      errors.salesEndAt =
        "تاریخ پایان فروش نمی‌تواند قبل از تاریخ شروع باشد.";
    }
  }

  if (!form.cityId) {
    errors.cityId = "شهر را انتخاب کنید.";
  }

  if (!form.eventVenues.trim()) {
    errors.eventVenues = "محل برگزاری را وارد کنید.";
  }

  if (!form.venueId) {
    errors.venueId = "سالن یا محل برگزاری را مشخص کنید.";
  }

  if (!form.isFree) {
    if (!form.price) {
      errors.price = "قیمت رویداد را وارد کنید.";
    } else if (
      !Number.isFinite(Number(form.price)) ||
      Number(form.price) < 0
    ) {
      errors.price = "قیمت واردشده معتبر نیست.";
    }
  }

  return errors;
}