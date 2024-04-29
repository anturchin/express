const { home, about, notFound, serverError } = require('../handlers');

it('home page renders', () => {
    const req = {};
    const res = { render: jest.fn() };
    home(req, res);
    expect(res.render.mock.calls.length).toBe(1);
    expect(res.render.mock.calls[0][0]).toBe('home');
});

it('about page renders with fortune', () => {
    const req = {};
    const res = { render: jest.fn() };
    about(req, res);
    expect(res.render.mock.calls.length).toBe(1);
    expect(res.render.mock.calls[0][0]).toBe('about')
});

it('404 handler renders', () => {
    const req = {};
    const res = { render: jest.fn() };
    notFound(req, res);
    expect(res.render.mock.calls.length).toBe(1);
    expect(res.render.mock.calls[0][0]).toBe('404');
});

it('500 handler renders', () => {
    const err = new Error('server error')
    const req = {};
    const res = { render: jest.fn() };
    const next = jest.fn();
    serverError(err, req, res, next);
    expect(res.render.mock.calls.length).toBe(1);
    expect(res.render.mock.calls[0][0]).toBe('500');
});