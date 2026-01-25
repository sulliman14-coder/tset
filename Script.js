// تفعيل القائمة المتنقلة على الهواتف
document.addEventListener('DOMContentLoaded', function() {
    // عناصر DOM
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    const faqQuestions = document.querySelectorAll('.faq-question');
    const loanForm = document.getElementById('loanForm');
    const calculateBtn = document.getElementById('calculateBtn');
    const currentYearSpan = document.getElementById('currentYear');
    
    // تحديث السنة الحالية في التذييل
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    
    // تبديل القائمة المتنقلة
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    
        // إغلاق القائمة عند النقر على رابط
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
    
    // تفعيل الأسئلة الشائعة
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                this.classList.toggle('active');
                const answer = this.nextElementSibling;
                
                if (this.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    answer.style.maxHeight = 0;
                }
            });
        });
    }
    
    // تحديث قيم المدخلات في حاسبة التمويل
    const loanAmount = document.getElementById('loanAmount');
    const loanTerm = document.getElementById('loanTerm');
    const interestRate = document.getElementById('interestRate');
    const loanAmountValue = document.getElementById('loanAmountValue');
    const loanTermValue = document.getElementById('loanTermValue');
    const interestRateValue = document.getElementById('interestRateValue');
    
    if (loanAmount && loanAmountValue) {
        loanAmount.addEventListener('input', function() {
            const value = parseInt(this.value).toLocaleString();
            loanAmountValue.textContent = `${value} ر.س`;
        });
    }
    
    if (loanTerm && loanTermValue) {
        loanTerm.addEventListener('input', function() {
            loanTermValue.textContent = `${this.value} شهر`;
        });
    }
    
    if (interestRate && interestRateValue) {
        interestRate.addEventListener('input', function() {
            interestRateValue.textContent = `${this.value}%`;
        });
    }
    
    // حاسبة التمويل
    function calculateLoan() {
        const amount = parseFloat(loanAmount.value);
        const term = parseFloat(loanTerm.value);
        const rate = parseFloat(interestRate.value) / 100 / 12; // نسبة شهرية
        
        if (amount && term && rate >= 0) {
            // حساب القسط الشهري
            const monthlyPayment = amount * (rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
            
            // حساب إجمالي المبلغ
            const totalAmount = monthlyPayment * term;
            
            // حساب إجمالي الفائدة
            const totalInterest = totalAmount - amount;
            
            // تحديث النتائج
            document.getElementById('monthlyPayment').textContent = 
                isNaN(monthlyPayment) ? '0 ر.س' : `${monthlyPayment.toFixed(0).toLocaleString()} ر.س`;
                
            document.getElementById('totalAmount').textContent = 
                isNaN(totalAmount) ? '0 ر.س' : `${totalAmount.toFixed(0).toLocaleString()} ر.س`;
                
            document.getElementById('totalInterest').textContent = 
                isNaN(totalInterest) ? '0 ر.س' : `${totalInterest.toFixed(0).toLocaleString()} ر.س`;
        }
    }
    
    // حساب تلقائي عند تغيير القيم
    if (loanAmount && loanTerm && interestRate) {
        [loanAmount, loanTerm, interestRate].forEach(input => {
            input.addEventListener('input', calculateLoan);
        });
        
        // حساب أولي عند تحميل الصفحة
        calculateLoan();
    }
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateLoan);
    }
    
    // معالجة نموذج طلب التمويل
    if (loanForm) {
        loanForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // جمع البيانات من النموذج
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                city: document.getElementById('city').value,
                loanType: document.getElementById('loanType').value,
                amount: document.getElementById('amount').value,
                message: document.getElementById('message').value
            };
            
            // هنا يمكن إرسال البيانات إلى الخادم
            // لأغراض العرض، سنعرض رسالة نجاح فقط
            
            // عرض رسالة نجاح
            alert('شكراً لك! تم استلام طلبك بنجاح. سيتصل بك مستشارنا المالي خلال 24 ساعة.');
            
            // إعادة تعيين النموذج
            this.reset();
            
            // التمرير إلى أعلى الصفحة
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // إضافة تأثير التمرير الناعم لجميع الروابط
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // إذا كان الرابط يشير إلى قسم في الصفحة الحالية
            if (href !== '#' && href.startsWith('#') && document.querySelector(href)) {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // إضافة تأثير التمرير لشريط التنقل
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
});