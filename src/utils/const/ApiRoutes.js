const API_URL = {
    API_URL:  'http://api-sousmontoit.am.manusien-ecolelamanu.fr/public/',
    API_URL_DEV:'http://localhost:8000/',
    COVER_ESTATE_BASE_URL:'http://api-sousmontoit.am.manusien-ecolelamanu.fr/storage/app/public/pictures/estates/',
    AVATAR_BASE_URL:'http://api-sousmontoit.am.manusien-ecolelamanu.fr/storage/app/public/pictures/avatars/',
    login: 'login/staff',
    logout: 'api/c/logout',
    me: 'api/c/me',
    refresh: 'api/c/refresh',
    //Estate
    create_estate:'estates/create',
    update_estate:'estates/update',
    estates: 'estates',
    delete_estate: 'estates/delete',
    delete_all_pictures_estate: 'estates_pictures/delete_all',
    estates_types: 'estates_types',
    search_estates: 'estates/search',
    estates_rnd: 'estates/rnd',
    estates_pictures: 'estates_pictures',
    estates_cover: 'estates_pictures/cover',
    upload_pictures:'estates_pictures/upload',
    delete_pictures:'estates_pictures/delete',
    choiceCover_pictures:'estates_pictures/choiceCover',
    //Staff
    staff: 'staff',
    staff_update: 'staff/update',
    staff_delete: 'staff/delete',
    staff_create: 'staff/create',
    functions: 'functions',
    roles: 'roles',
    //Customer
    create_customer: 'customer/create',
    customer: 'customer/s',
    search_customer: 'customer/s/search/',
    update_customer: 'customer/s/update/',
    delete_customer: 'customer/s/delete/',
    customer_search_s: 'customer_search/s',
    customer_schedule: 'schedule/customer',
    customer_search: 'customer_search/s',
    customer_search_all: 'customer_search/s/customer',
    customer_create_search: 'customer_search/s/create',
    customer_update_search: 'customer_search/s/update',
    customer_delete_search: 'customer_search/s/delete',
    customers_types: 'customer_type',
    //Appointment
    calendar: 'schedule/calendar',
    staff_schedule: 'schedule/staff',
    update_event: 'schedule/update',
    get_one_event: 'schedule/',
    apptmtType: 'schedule/appointmentsTypes',
    create_apptmt: 'schedule/createAppt',
    delete_apptmt: 'schedule/delete/',
}

export default API_URL;
