const API_URL = {
    API_URL: 'http://api-sousmontoit.am.manusien-ecolelamanu.fr/public/',
    API_URL_DEV: 'http://localhost:8000/',
    COVER_ESTATE_BASE_URL:'http://api-sousmontoit.am.manusien-ecolelamanu.fr/storage/app/public/pictures/estates/',
    login: 'login/staff',
    logout: 'api/c/logout',
    me: 'api/c/me',
    refresh: 'api/c/refresh',
    estates: 'estates',
    estates_types: 'estates_types',
    estates_rnd: 'estates/rnd',
    staff: 'staff',
    create_customer: 'customer/create',
    customer: 'customer/s',
    search_customer: 'customer/s/search/',
    update_customer: 'customer/update',
    delete_customer: 'customer/delete',
    customer_search: 'customer_search/c',
    customer_search_all: 'customer_search/c/customer',
    customer_create_search: 'customer_search/c/create',
    customer_update_search: 'customer_search/c/update',
    customer_delete_search: 'customer_search/c/delete',
    customers_types: 'customer_type',
    estates_pictures: 'estates_pictures',
    estates_cover: 'estates_pictures/cover',
    search_estates: 'estates/search',
    calendar: 'schedule/calendar',
    update_event: 'schedule/update',
    get_one_event: 'schedule/',
    apptmtType: 'schedule/appointmentsTypes',
    create_apptmt: 'schedule/createAppt',
    delete_apptmt: 'schedule/delete/',
}

export default API_URL;
