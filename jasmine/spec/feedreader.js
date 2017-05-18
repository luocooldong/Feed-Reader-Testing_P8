/* feedreader.js
 *
 * 这是 Jasmine 会读取的spec文件，它包含所有的要在你应用上面运行的测试。
 */

/* 我们把所有的测试都放在了 $() 函数里面。因为有些测试需要 DOM 元素。
 * 我们得保证在 DOM 准备好之前他们不会被运行。
 */
$(function () {
	/* 这是我们第一个测试用例 - 其中包含了一定数量的测试。这个用例的测试
	 * 都是关于 Rss 源的定义的，也就是应用中的 allFeeds 变量。
	 */
	describe('RSS Feeds', function () {
		/* 这是我们的第一个测试 - 它用来保证 allFeeds 变量被定义了而且
		 * 不是空的。在你开始做这个项目剩下的工作之前最好实验一下这个测试
		 * 比如你把 app.js 里面的 allFeeds 变量变成一个空的数组然后刷新
		 * 页面看看会发生什么。       说明： 把数组置为空数组时，会出现Expected 0 not to be 0.
		 */
		it('are defined and not empty', function () {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});


		/* TODO:
		 * 编写一个测试遍历 allFeeds 对象里面的所有的源来保证有链接字段而且链接不是空的。
		 */
		it('url defined and not empty', function () {
			allFeeds.forEach(function (feed) {
				expect(feed.url).toBeDefined(); //确保连接URL被定义
				expect(feed.url.length).not.toBe(0); //确保连接URL不是空值，即长度不为0
			});
		});


		/* TODO:
		 * 编写一个测试遍历 allFeeds 对象里面的所有的源来保证有名字字段而且不是空的。
		 */
		it('name defined and not empty', function () {
			allFeeds.forEach(function (feed) {
				expect(feed.name).toBeDefined(); //确保名字被定义
				expect(typeof feed.name).toEqual('string'); //确保名字类型为字符串
				expect(feed.name.length).toBeGreaterThan(0); //确保该字符串长度不是空值
			});
		});

	});


	/* TODO: 写一个叫做 "The menu" 的测试用例 */
	describe('The menu', function () {
		/* TODO:
		 * 写一个测试用例保证菜单元素默认是隐藏的。你需要分析 html 和 css
		 * 来搞清楚我们是怎么实现隐藏/展示菜单元素的。
		 */
		it('is hidden by default', function () { //经过定位，确认body元素的menu-hidden类属性是控制菜单是否显示的关键
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});


		/* TODO:
		 * 写一个测试用例保证当菜单图标被点击的时候菜单会切换可见状态。这个
		 * 测试应该包含两个 expectation ： 当点击图标的时候菜单是否显示，
		 * 再次点击的时候是否隐藏。
		 */
		it('changes visibility when icon clicked', function () {
			var hamburger = $('.menu-icon-link');

			// 测试当点击图标的时候菜单是否显示.
			hamburger.click();
			expect($('body').hasClass('menu-hidden')).toBe(false);

			// 再次点击的时候菜单隐藏.
			hamburger.click();
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});
	});



	/* TODO: 13. 写一个叫做 "Initial Entries" 的测试用例 */
	describe('Initial Entries', function () {
		/* TODO:
		 * 写一个测试保证 loadFeed 函数被调用而且工作正常，即在 .feed 容器元素
		 * 里面至少有一个 .entry 的元素。
		 *
		 * 记住 loadFeed() 函数是异步的所以这个而是应该使用 Jasmine 的 beforeEach
		 * 和异步的 done() 函数。
		 */
		beforeEach(function (done) { //beforeEach 用来处理异步函数loadFeed()
			loadFeed(0, function () {
				done(); // 并在回调函数中执行异步的done()函数
			});
		});
		// 确保在调用并执行 loadFeed 函数后， 在 .feed 容器中至少存在一个 .entry 元素
		it('should be called and contain at least one feed.', function (done) {
			expect($('.entry').length).toBeGreaterThan(0);
			done(); // 调用done函数来标识该测试用用例成功执行，并发出信号通知系统
		});
	});


	/* TODO: 写一个叫做 "New Feed Selection" 的测试用例 */
	describe('New Feed Selection', function () {
		/* TODO:
		 * 写一个测试保证当用 loadFeed 函数加载一个新源的时候内容会真的改变。
		 * 记住，loadFeed() 函数是异步的。
		 */
		var feedOne,
			feedTwo;

		beforeEach(function (done) {
			loadFeed(0, function(){
				feedOne = $('.feed').html();  //  事先取到原来页面中的内容
				done();
			});
		});
		
		
        // 确保每当 loadFeed 函数加载一条新反馈后， 内容会相应更改
		it('should change feed content after loading feed', function(done) {
            loadFeed(1, function() {
                feedTwo = $('.feed').html();
                expect(feedTwo).not.toEqual(feedOne); // 前后两次内容做比较
                done();
            });
        });
	});


}());